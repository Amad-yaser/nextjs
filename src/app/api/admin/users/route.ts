import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
const mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'admin',
    status: 'active' as const,
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20 14:30'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    role: 'user',
    status: 'active' as const,
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19 09:15'
  },
  {
    id: '3',
    name: 'محمد عبدالله',
    email: 'mohammed@example.com',
    role: 'moderator',
    status: 'inactive' as const,
    joinDate: '2024-01-05',
    lastLogin: '2024-01-18 16:45'
  },
  {
    id: '4',
    name: 'مريم أحمد',
    email: 'mariam@example.com',
    role: 'user',
    status: 'suspended' as const,
    joinDate: '2024-01-12',
    lastLogin: '2024-01-17 11:20'
  },
  {
    id: '5',
    name: 'عبدالرحمن سالم',
    email: 'abdulrahman@example.com',
    role: 'user',
    status: 'active' as const,
    joinDate: '2024-01-08',
    lastLogin: '2024-01-20 13:00'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would:
    // 1. Authenticate the user
    // 2. Check permissions
    // 3. Fetch from database
    
    return NextResponse.json(mockUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would:
    // 1. Validate the input
    // 2. Check permissions
    // 3. Create user in database
    
    const newUser = {
      id: Date.now().toString(),
      ...body,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toLocaleString('ar-SA')
    };
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}