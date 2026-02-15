/**
 * @swagger
 * tags:
 *   - name: Academics
 *     description: Alumni academic records management
 */

/**
 * @swagger
 * /api/alumni/education/{educationId}:
 *   put:
 *     summary: Update specific education record (Owner only)
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Education Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degreeName:
 *                 type: string
 *                 example: M.Tech Computer Science
 *               universityName:
 *                 type: string
 *                 example: IIT Bombay
 *               score:
 *                 type: string
 *                 example: 9.1 CGPA
 *               completionYear:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       200:
 *         description: Education updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User ID mismatch)
 *       404:
 *         description: Education record not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete specific education record (Owner only)
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Education Record ID
 *     responses:
 *       200:
 *         description: Education deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User ID mismatch)
 *       404:
 *         description: Education record not found
 *       500:
 *         description: Server error
 */


import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ContextInterface from "@/Interfaces/context.interface";
import AcademicModel from "@/models/academics.model";
import ServerCatchError from "@/utils/serverCatchError";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";

export const PUT = async (
  req: NextRequest,
  context: ContextInterface
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return res.json({ message: "Unauthorized user" }, { status: 401 });

    const { params } = context;
    const { educationId } = await params;
    const id = session.user.id

    const body = await req.json();

    const education = await AcademicModel.findOne({
      _id: educationId,
      user: id,
    });

    if (!education)
      return res.json({ message: "Education record not found" }, { status: 404 });

    education.degreeName = body.degreeName ?? education.degreeName;
    education.universityName = body.universityName ?? education.universityName;
    education.score = body.score ?? education.score;
    education.completionYear = body.completionYear ?? education.completionYear;

    await education.save();

    return res.json({ message: "Education updated successfully" });

  } catch (err) {
    return ServerCatchError(err);
  }
};


export const DELETE = async (
  req: NextRequest,
  context: ContextInterface
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return res.json({ message: "Unauthorized user" }, { status: 401 });

    const { params } = context;
    const {educationId } = await params;

    const id = session.user.id 

    const education = await AcademicModel.findOneAndDelete({
      _id: educationId,
      user: id,
    });

    if (!education)
      return res.json({ message: "Education record not found" }, { status: 404 });

    return res.json({ message: "Education deleted successfully" });

  } catch (err) {
    return ServerCatchError(err);
  }
};
