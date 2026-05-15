import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateCreateUserData } from '../validators/auth.validator.js';
import "dotenv/config";
import { prisma } from "../../lib/prisma.ts";

export { prisma };
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !user.password) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    const expires_in = "15m";
    const access_token = jwt.sign(
      { id: user.id, email: user.email, role: user.role},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expires_in }
    );
    const refreshToken = jwt.sign(
      { userId: user.id }, 
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: '7d' }
    );
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: expirationDate
      }
    });
    res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

    res.status(200).json({ access_token, token_type: "Bearer", expires_in });
  } catch(error) {
    console.error(error); 
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  const { profilePicture, bio, fullName, externalLinks, email, password, role } = req.body;

  try {
    const validationError = validateCreateUserData(req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "SPEAKER") {
      newUser = await prisma.user.create({
        data: { profilePicture, bio, fullName, externalLinks, email, password: hashedPassword, role: "SPEAKER" }
      });
    } 
    else if (role === "PARTICIPANT") {
      newUser = await prisma.user.create({
        data: { fullName, email, password: hashedPassword, role: "PARTICIPANT" }
      });
    } 
    else if (role === "ADMIN") {
      newUser = await prisma.user.create({
        data: { email, password: hashedPassword, fullName, role: "ADMIN" }
      });
    } 
    else {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    res.status(201).json({ 
      message: `${role} registered`, 
      user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role } 
    });

  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: "Email already in use" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server error during registration" });
    }
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUserPermanently = async (req, res) => {
  const {id} = req.params; 
  const role = req.user.role;
  try {
    if (role !== 'ADMIN') return res.status(403).json({ message: "Forbidden" })
    const user = await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "User deleted permanently successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUserTemporarily = async (req, res) => {
  const { id } = req.params; 
  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });
    res.status(200).json({ message: "User deleted temporarily successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutUser = async (req, res) => {
  try{
    deleteToken(req, res);
    res.status(200).json({ message: "Logged out successfully" });
  }catch(error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const deleteToken = async (req, res) => {
  const { id } = req.params; 
  try {
    const deleteResult = await prisma.refreshToken.deleteMany({
      where: {
        userId: id,
        expiresAt: { lt: new Date() }
      }
    });
    res.clearCookie('refresh_token')
    res.status(200).json({ message: "Token deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const checkToken = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token provided" });

  try {
    const tokenInDb = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });
    
    if (!tokenInDb) return res.status(403).json({ error: "Token revoked or invalid" });
    if (tokenInDb.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { token: refreshToken } });
      return res.status(403).json({ error: "Token expired" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token" });
      const newAccessToken = jwt.sign(
        { userId: tokenInDb.user.id, email: tokenInDb.user.email, role: tokenInDb.user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      return res.json({
        access_token: newAccessToken,
        expires_in: 900
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

