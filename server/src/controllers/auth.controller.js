import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { validateCreateUserData } from '../validators/auth.validator.js';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !user.password) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });
  
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    res.status(200).json({ message: "Login successful", token });
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
  const { role } = req.body;
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