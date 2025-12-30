import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalTemplates: 45,
  totalMessages: 234,
  totalRevenue: 45678,
  monthlyGrowth: 12.5
};

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}