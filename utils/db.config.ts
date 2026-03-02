import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"
const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`
mongoose.connect(DB)

