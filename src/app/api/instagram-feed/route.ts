import { NextResponse } from 'next/server';
import type { InstagramFeedResponse } from '@/types';

export async function GET() {
  try {
    // Instagram Access Token from environment variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Instagram access token not configured' },
        { status: 500 }
      );
    }

    // Instagram Graph API endpoint
    const instagramApiUrl = `https://graph.instagram.com/me/media?fields=id,media_url,media_type,caption,permalink,timestamp,username&access_token=${accessToken}&limit=12`;

    const response = await fetch(instagramApiUrl);
    
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data: InstagramFeedResponse = await response.json();
    
    // Filter only images and videos (exclude carousel albums for now)
    const filteredData = {
      ...data,
      data: data.data.filter(post => 
        post.media_type === 'IMAGE' || post.media_type === 'VIDEO'
      )
    };

    return NextResponse.json(filteredData);
    
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram feed' },
      { status: 500 }
    );
  }
} 