import "dotenv/config";
import { prisma } from "../../lib/prisma.ts";

export { prisma };
export const getSpeakerProfile = async (req, res) => {
  const { id } = req.params;

  try {

    const speaker = await prisma.user.findFirst({
      where: {
        id,
        role: 'SPEAKER',
        deletedAt: null,
      },

      select: {
        id: true,
        fullName: true,
        bio: true,
        profilePicture: true,
        externalLinks: true,
        createdAt: true,

        sessions: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });
    const profilePictureUrl = speaker.profilePicture
    ? `${req.protocol}://${req.get("host")}${speaker.profilePicture}`
    : null;
    if (!speaker) {
      return res.status(404).json({
        message: "Speaker not found"
      });
    }

    return res.status(200).json({
      speaker: {
            ...speaker,
            profilePicture: profilePictureUrl
        }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};