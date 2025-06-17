import type { InstagramPost } from '@/types';

export const mockInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    media_url: '/images/st.png',
    media_type: 'IMAGE',
    caption: '드디어 찾았다! 이 집 스테이크 진짜 맛있어요 😍 육질이 정말 부드럽고 굽기도 완벽! #bistro #steak #맛집 #데이트 #완벽한저녁',
    permalink: 'https://instagram.com/p/mock1',
    timestamp: '2024-01-20T19:30:00+0000',
    username: 'foodie_jane'
  },
  {
    id: '2',
    media_url: '/images/tbon.png',
    media_type: 'IMAGE',
    caption: 'T-본 스테이크 👌 역시 이 집은 실망시키지 않네요! 친구들과 함께한 완벽한 밤 🥩✨ #tbone #steakhouse #friendship #yummy',
    permalink: 'https://instagram.com/p/mock2',
    timestamp: '2024-01-19T20:15:00+0000',
    username: 'steak_lover_kim'
  },
  {
    id: '3',
    media_url: '/images/bt.png',
    media_type: 'IMAGE',
    caption: '와... 이 비주얼 실화냐 🔥 맛도 비주얼만큼 완벽했어요! 데이트 코스로 강추합니다 💕 #beautiful #delicious #datenight #romantic',
    permalink: 'https://instagram.com/p/mock3',
    timestamp: '2024-01-18T18:45:00+0000',
    username: 'couple_dining'
  },
  {
    id: '4',
    media_url: '/images/st4.png',
    media_type: 'IMAGE',
    caption: '오늘도 여기서 스테이크 🥩 매번 와도 질리지 않는 맛! 서비스도 최고예요 👏 #regular #bestservice #alwaysgood #satisfied',
    permalink: 'https://instagram.com/p/mock4',
    timestamp: '2024-01-17T19:00:00+0000',
    username: 'regular_customer'
  },
  {
    id: '5',
    media_url: '/images/st5.png',
    media_type: 'IMAGE',
    caption: '생일 기념 스테이크 🎂🥩 특별한 날에는 역시 이 집이죠! 분위기도 음식도 모든 게 완벽했어요 #birthday #celebration #special #perfect',
    permalink: 'https://instagram.com/p/mock5',
    timestamp: '2024-01-16T20:30:00+0000',
    username: 'birthday_girl'
  },
  {
    id: '6',
    media_url: '/images/st6.png',
    media_type: 'IMAGE',
    caption: '회사 회식으로 왔는데 대박! 상사님이 좋은 곳 데려왔다고 하더니 진짜네요 😎 #company #dinner #boss #approved #teamdinner',
    permalink: 'https://instagram.com/p/mock6',
    timestamp: '2024-01-15T19:45:00+0000',
    username: 'office_worker'
  },
  {
    id: '7',
    media_url: '/images/st7.png',
    media_type: 'IMAGE',
    caption: '프리미엄 스테이크의 정석 👑 이 정도면 미슐랭 가이드에 올라가야 하는 거 아닌가요? #premium #michelin #quality #topnotch #impressive',
    permalink: 'https://instagram.com/p/mock7',
    timestamp: '2024-01-14T18:20:00+0000',
    username: 'food_critic'
  },
  {
    id: '8',
    media_url: '/images/st8.png',
    media_type: 'IMAGE',
    caption: '친구 추천으로 왔는데 완전 대박! 다음에 또 올게요 😍 사진 찍기도 예쁘고 맛도 최고 #friend #recommendation #beautiful #photogenic #comeback',
    permalink: 'https://instagram.com/p/mock8',
    timestamp: '2024-01-13T17:30:00+0000',
    username: 'photo_lover'
  },
  {
    id: '9',
    media_url: '/images/st9.png',
    media_type: 'IMAGE',
    caption: '가족 모임으로 왔어요! 부모님도 엄청 만족하셨어요 👨‍👩‍👧‍👦 3대가 함께해도 모두 좋아하는 맛 #family #parents #generations #together #unanimous',
    permalink: 'https://instagram.com/p/mock9',
    timestamp: '2024-01-12T19:15:00+0000',
    username: 'family_time'
  },
  {
    id: '10',
    media_url: '/images/st10.png',
    media_type: 'IMAGE',
    caption: '혼자 와도 전혀 어색하지 않아요! 직원분들이 너무 친절하시고 혼밥 하기 좋은 분위기 🍽️ #solo #dining #comfortable #kind #staff',
    permalink: 'https://instagram.com/p/mock10',
    timestamp: '2024-01-11T18:00:00+0000',
    username: 'solo_diner'
  },
  {
    id: '11',
    media_url: '/images/st11.png',
    media_type: 'IMAGE',
    caption: '기념일 디너로 완벽! 와인 페어링도 최고였어요 🍷 로맨틱한 분위기에 취해버렸네요 #anniversary #wine #pairing #romantic #atmosphere',
    permalink: 'https://instagram.com/p/mock11',
    timestamp: '2024-01-10T20:45:00+0000',
    username: 'wine_couple'
  },
  {
    id: '12',
    media_url: '/images/wr.png',
    media_type: 'IMAGE',
    caption: '와인과 스테이크의 환상적인 조합! 소믈리에가 추천해준 와인이 정말 잘 맞아요 🍷🥩 #wine #sommelier #perfect #pairing #expertise',
    permalink: 'https://instagram.com/p/mock12',
    timestamp: '2024-01-09T19:30:00+0000',
    username: 'wine_expert'
  }
];

// 랜덤하게 좋아요 수와 댓글 수를 생성하는 함수
export const generateRandomEngagement = () => ({
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 50) + 5
});

// 시간을 한국어로 포맷하는 함수
export const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return '방금 전';
}; 