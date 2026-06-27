import { NextRequest, NextResponse  as res} from "next/server";
import UserModel from "@/models/user.model";
import { connectDB } from "@/lib/mongodb";
import { qstash } from "@/utils/qstash";
import ServerCatchError from "@/utils/serverCatchError";

const BATCH_SIZE = 50;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { month } = await req.json();

    const users = await UserModel.find({},
      {
        email: 1,
        fullname: 1,
      }
    ).limit(1)

    console.log(month)

    // Split users into batches of 50
    const batches = [];

    for (let i = 0; i < users.length; i += BATCH_SIZE)
    {
      batches.push(users.slice(i, i + BATCH_SIZE));
    }

    // Queue one job per batch
    await Promise.all(
      batches.map((batch) =>
        qstash.publishJSON({
          url: `${process.env.SERVER}/api/queue/send-email`,
          body: {
            users: batch,
            month
          },
        })
      )
    );
    return res.json({
      success: true,
      totalUsers: users.length,
      totalBatches: batches.length,
      batchSize: BATCH_SIZE,
    });
  } catch (error) {
    ServerCatchError(error)
  }
}