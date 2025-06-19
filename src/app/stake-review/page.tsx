'use client';

import { useState, useEffect } from 'react';
import type { InstagramPost } from '@/types';
import { mockInstagramPosts, generateRandomEngagement, formatTimeAgo } from '@/lib/mock-instagram-data';
import Image from 'next/image';

// ============================================================================
// 🎨 디자인 설정 (여기서 쉽게 커스터마이징 가능)
// ============================================================================
const DESIGN_CONFIG = {
  // 색상 팔레트
  colors: {
    primary: 'amber', // amber, orange, red, blue 등으로 변경 가능
    accent: 'orange',
    background: {
      from: 'from-neutral-900',
      via: 'via-stone-900', 
      to: 'to-neutral-900'
    },
    text: {
      primary: 'text-white',
      secondary: 'text-amber-100',
      muted: 'text-amber-200/60'
    }
  },
  
  // 폰트 설정 (커스텀 폰트 사용)
  fonts: {
    hero: {
      title: 'font-nanum-round',      // 나눔스퀘어라운드 - 둥근 귀여운 폰트
      subtitle: 'font-nanum-round',   // 마루부리 - 감성적인 폰트
      description: 'font-nanum-round', // Pretendard - 깔끔한 읽기용
      stats: 'font-pretendard-semibold' // Pretendard 세미볼드
    },
    filter: {
      button: 'font-pretendard-semibold', // Pretendard 세미볼드
      count: 'font-pretendard' // Pretendard 일반
    },
    card: {
      username: 'font-maruburi-semibold', // 마루부리 세미볼드
      timestamp: 'font-pretendard', // Pretendard 일반
      caption: 'font-pretendard', // Pretendard 일반
      hashtag: 'font-pretendard-semibold' // Pretendard 세미볼드
    },
    loading: {
      title: 'font-kotra', // KOTRA Bold
      subtitle: 'font-pretendard', // Pretendard 일반
      description: 'font-pretendard' // Pretendard 일반
    },
    modal: {
      username: 'font-maruburi-bold', // 마루부리 볼드
      timestamp: 'font-pretendard', // Pretendard 일반
      caption: 'font-pretendard', // Pretendard 일반
      hashtag: 'font-pretendard-semibold' // Pretendard 세미볼드
    },
    empty: {
      title: 'font-kotra', // KOTRA Bold
      message: 'font-pretendard' // Pretendard 일반
    }
  },
  
  // 텍스트 크기 설정 (모바일 최적화)
  textSizes: {
    hero: {
      title: 'text-3xl sm:text-4xl md:text-6xl lg:text-8xl',        // 모바일에서 더 작게 시작
      subtitle: 'text-lg sm:text-xl md:text-2xl lg:text-4xl',     // 모바일에서 더 작게 시작  
      description: 'text-sm sm:text-base md:text-lg lg:text-2xl',              // 모바일에서 더 작게 시작
      stats: 'text-xs sm:text-sm md:text-base lg:text-2xl'                   // 모바일에서 더 작게 시작
    },
    filter: {
      button: 'text-base',                 // 기존: text-sm
      count: 'text-base'                   // 기존: text-sm
    },
    card: {
      username: 'text-base',               // 기존: text-sm
      timestamp: 'text-sm',                // 기존: text-xs
      caption: 'text-base',                // 기존: text-sm
      hashtag: 'text-sm'                   // 기존: text-xs
    },
    loading: {
      title: 'text-2xl',                   // 기존: text-xl
      subtitle: 'text-base',               // 기존: text-sm
      description: 'text-base'             // 기존: text-sm
    },
    modal: {
      username: 'text-lg',                 // 새로 추가
      timestamp: 'text-base',              // 기존: text-sm
      caption: 'text-lg',                  // 새로 추가
      hashtag: 'text-base'                 // 기존: text-sm
    },
    empty: {
      title: 'text-2xl',                   // 기존: text-xl
      message: 'text-base'                 // 기존: 지정 없음
    }
  },
  
  // 레이아웃 설정
  layout: {
    heroHeight: 'h-screen', // h-screen, h-96, h-[600px] 등
    maxWidth: 'max-w-6xl', // max-w-4xl, max-w-7xl 등
    gridCols: {
      mobile: 'grid-cols-1',
      tablet: 'sm:grid-cols-2', 
      desktop: 'md:grid-cols-3' // lg:grid-cols-4 등으로 변경 가능
    },
    spacing: {
      section: 'py-16', // py-12, py-20 등
      card: 'gap-6', // gap-4, gap-8 등
      padding: 'px-4'
    }
  },
  
  // 애니메이션 설정
  animations: {
    transition: 'transition-all duration-300',
    hoverScale: 'hover:scale-105 hover:-translate-y-2',
    imageScale: 'group-hover:scale-110 transition-transform duration-500'
  },
  
  // 배경 이미지 설정
  backgroundImages: {
    hero: '/images/bg9.png', // Hero 섹션 배경
    grid: '/images/bg11.png', // 그리드 섹션 배경 (새로 추가!)
    // 배경 이미지를 사용하지 않으려면 null 또는 '' 으로 설정
    // grid: null, // 배경 이미지 없음
  }
};

// ============================================================================
// 📋 해시태그 필터 설정
// ============================================================================
const HASHTAGS = [
  { id: 'all', label: '전체', filter: '', color: 'bg-amber-600' },
  { id: 'steak', label: '#스테이크', filter: 'steak', color: 'bg-red-600' },
  { id: 'wine', label: '#와인페어링', filter: 'wine', color: 'bg-purple-600' },
  { id: 'date', label: '#데이트', filter: 'date', color: 'bg-pink-600' },
  { id: 'anniversary', label: '#기념일', filter: 'anniversary', color: 'bg-rose-600' },
  { id: 'atmosphere', label: '#분위기', filter: 'atmosphere', color: 'bg-indigo-600' },
  // 여기에 쉽게 해시태그 추가 가능
  // { id: 'newTag', label: '#새태그', filter: 'newtag', color: 'bg-green-600' },
];

// ============================================================================
// 📊 페이지 콘텐츠 설정
// ============================================================================
const PAGE_CONTENT = {
  hero: {
    title: (
      <>
        <span className="block">당신의 한 끼가,</span>
        <span className="block">우리의 이야기로</span>
      </>
    ),
    subtitle: (
      <>
        고객들이 남긴 생생한 후기가<br className="sm:hidden" /> 이 공간에 모였습니다.
      </>
    ),
    description: (
      <>
        당신의 테이블 위에서 피어난<br className="sm:hidden" /> 순간들을 함께 감상해보세요.
      </>
    ),
    stats: {
      rating: '4.9/5.0',
      updateText: '실시간 업데이트'
    }
  },
  
  loading: {
    text: '피드를 불러오는 중...',
    subtext: '잠시만 기다려주세요'
  },
  
  error: {
    title: '피드를 불러올 수 없습니다',
    message: '인스타그램에서 게시물을 가져오지 못했습니다.',
    retryText: '다시 시도'
  },
  
  empty: {
    title: '해당 필터에 맞는 리뷰가 없습니다',
    message: '다른 해시태그를 선택해보세요'
  }
};

export default function StakeReviewPage() {
  // ============================================================================
  // 🔄 상태 관리
  // ============================================================================
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHashtag, setSelectedHashtag] = useState('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  // ============================================================================
  // 📡 데이터 로딩 함수
  // ============================================================================
  const loadMockData = () => {
    setLoading(true);
    setTimeout(() => {
      // 데이터 확장 및 가공
      const enhancedPosts = mockInstagramPosts.map(post => {
        const engagement = generateRandomEngagement();
        const hashtags = post.caption?.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
        
        return {
          ...post,
          imageUrl: post.media_url,
          likes: engagement.likes,
          comments: engagement.comments,
          hashtags,
          url: post.permalink,
          timestamp: formatTimeAgo(post.timestamp)
        };
      });
      
      setPosts(enhancedPosts);
      setLoading(false);
    }, 1000); // 로딩 시간 조절 가능
  };

  useEffect(() => {
    loadMockData();
  }, []);

  // ============================================================================
  // 🔍 필터링 로직
  // ============================================================================
  const filteredPosts = selectedHashtag === 'all' 
    ? posts 
    : posts.filter(post => 
        post.caption?.toLowerCase().includes(selectedHashtag) ||
        post.hashtags?.some((tag: string) => tag.toLowerCase().includes(selectedHashtag))
      );

  // ============================================================================
  // 🎬 이벤트 핸들러
  // ============================================================================
  const handleRetry = () => {
    setError(null);
    loadMockData();
  };

  const handlePostClick = (post: InstagramPost) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleHashtagClick = (hashtagId: string) => {
    setSelectedHashtag(hashtagId);
  };

  // ============================================================================
  // 🎨 UI 컴포넌트들
  // ============================================================================
  
  // 로딩 스피너 컴포넌트
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-32">
      <div className={`w-16 h-16 border-4 border-${DESIGN_CONFIG.colors.primary}-300/30 border-t-${DESIGN_CONFIG.colors.primary}-400 rounded-full animate-spin mb-6`}></div>
      <p className={`${DESIGN_CONFIG.colors.text.secondary} ${DESIGN_CONFIG.textSizes.loading.title} font-medium`}>
        {PAGE_CONTENT.loading.text}
      </p>
      <p className={`${DESIGN_CONFIG.colors.text.muted} ${DESIGN_CONFIG.textSizes.loading.subtitle} mt-2`}>
        {PAGE_CONTENT.loading.subtext}
      </p>
    </div>
  );

  // 에러 메시지 컴포넌트
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="bg-red-900/20 border border-red-400/30 rounded-2xl p-8 max-w-md text-center backdrop-blur-xs">
        <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className={`${DESIGN_CONFIG.textSizes.loading.title} font-bold text-red-400 mb-3`}>{PAGE_CONTENT.error.title}</h3>
        <p className={`text-red-300/80 ${DESIGN_CONFIG.textSizes.loading.description} mb-6`}>
          {error || PAGE_CONTENT.error.message}
        </p>
        <button
          onClick={handleRetry}
          className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all duration-300 font-medium ${DESIGN_CONFIG.textSizes.loading.subtitle}`}
        >
          {PAGE_CONTENT.error.retryText}
        </button>
      </div>
    </div>
  );

  // Hero 섹션 컴포넌트
  const HeroSection = () => (
    <section className={`relative ${DESIGN_CONFIG.layout.heroHeight} flex items-center justify-center overflow-hidden`}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${DESIGN_CONFIG.backgroundImages.hero}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      </div>

      {/* Hero 콘텐츠 */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">

        <h1 className={`${DESIGN_CONFIG.textSizes.hero.title} ${DESIGN_CONFIG.fonts.hero.title} ${DESIGN_CONFIG.colors.text.primary} mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight`}>
          {PAGE_CONTENT.hero.title}
        </h1>
        
        <p className={`${DESIGN_CONFIG.textSizes.hero.subtitle} ${DESIGN_CONFIG.fonts.hero.subtitle} ${DESIGN_CONFIG.colors.text.secondary} mb-3 sm:mb-4 md:mb-6 leading-relaxed`}>
          {PAGE_CONTENT.hero.subtitle}
        </p>
        
        <p className={`${DESIGN_CONFIG.textSizes.hero.description} ${DESIGN_CONFIG.fonts.hero.description} ${DESIGN_CONFIG.colors.text.muted} max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2 sm:px-0`}>
          {PAGE_CONTENT.hero.description}
        </p>

        {/* 통계 정보 */}
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 ${DESIGN_CONFIG.colors.text.muted}`}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className={`${DESIGN_CONFIG.textSizes.hero.stats} ${DESIGN_CONFIG.fonts.hero.stats}`}>{PAGE_CONTENT.hero.stats.updateText}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={`${DESIGN_CONFIG.textSizes.hero.stats} ${DESIGN_CONFIG.fonts.hero.stats}`}>{posts.length}+ 리뷰</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className={`${DESIGN_CONFIG.textSizes.hero.stats} ${DESIGN_CONFIG.fonts.hero.stats}`}>평점 {PAGE_CONTENT.hero.stats.rating}</span>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className={`w-6 h-6 text-${DESIGN_CONFIG.colors.primary}-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );

  // 포스트 카드 컴포넌트
  const PostCard = ({ post }: { post: InstagramPost }) => (
    <div
      className={`group cursor-pointer transform ${DESIGN_CONFIG.animations.transition} ${DESIGN_CONFIG.animations.hoverScale}`}
      onClick={() => handlePostClick(post)}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-stone-800/30 backdrop-blur-xs border border-stone-700/30 shadow-xl hover:shadow-2xl hover:shadow-${DESIGN_CONFIG.colors.primary}-900/20`}>
        {/* 이미지 영역 */}
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={post.imageUrl || post.media_url}
            alt={post.caption || 'Instagram post'}
            className={`w-full h-full object-cover ${DESIGN_CONFIG.animations.imageScale}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={`absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 ${DESIGN_CONFIG.animations.transition}`}></div>
          
          {/* 호버 오버레이 */}
          <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 ${DESIGN_CONFIG.animations.transition}`}>
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{post.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-medium">{post.comments || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 푸터 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 bg-linear-to-br from-${DESIGN_CONFIG.colors.primary}-400 to-${DESIGN_CONFIG.colors.accent}-600 rounded-full flex items-center justify-center`}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={`${DESIGN_CONFIG.colors.text.secondary} ${DESIGN_CONFIG.textSizes.card.username} font-medium`}>
                {post.username || '익명'}
              </span>
            </div>
            <span className={`${DESIGN_CONFIG.colors.text.muted} ${DESIGN_CONFIG.textSizes.card.timestamp}`}>{post.timestamp}</span>
          </div>
          
          <p className={`${DESIGN_CONFIG.colors.text.muted} ${DESIGN_CONFIG.textSizes.card.caption} line-clamp-2 mb-3`}>
            {post.caption || ''}
          </p>

          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.hashtags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className={`${DESIGN_CONFIG.textSizes.card.hashtag} text-${DESIGN_CONFIG.colors.primary}-400 bg-${DESIGN_CONFIG.colors.primary}-900/20 px-2 py-1 rounded-full`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // 🎯 메인 렌더링
  // ============================================================================
  return (
    <main className={`min-h-screen bg-linear-to-b ${DESIGN_CONFIG.colors.background.from} ${DESIGN_CONFIG.colors.background.via} ${DESIGN_CONFIG.colors.background.to}`}>
      
      {/* 🎨 Hero 섹션 */}
      <HeroSection />

      {/* 🏷️📱 통합된 필터 + 그리드 섹션 */}
      <section className={`${DESIGN_CONFIG.layout.spacing.section} ${DESIGN_CONFIG.layout.spacing.padding} pb-20 relative`}>
        {/* 통합 섹션 배경 이미지 */}
        {DESIGN_CONFIG.backgroundImages.grid && (
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-fixed"
              style={{ backgroundImage: `url('${DESIGN_CONFIG.backgroundImages.grid}')` }}
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
        )}
        
        <div className={`${DESIGN_CONFIG.layout.maxWidth} mx-auto relative z-10`}>
          {/* 🏷️ 해시태그 필터 */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {HASHTAGS.map((hashtag) => (
                <button
                  key={hashtag.id}
                  onClick={() => handleHashtagClick(hashtag.id)}
                  className={`px-6 py-3 rounded-full ${DESIGN_CONFIG.textSizes.filter.button} font-medium ${DESIGN_CONFIG.animations.transition} border backdrop-blur-xs ${
                    selectedHashtag === hashtag.id
                      ? `${hashtag.color} text-white border-${DESIGN_CONFIG.colors.primary}-500 shadow-lg shadow-${DESIGN_CONFIG.colors.primary}-600/30`
                      : `bg-stone-800/50 ${DESIGN_CONFIG.colors.text.secondary} border-stone-600/50 hover:bg-stone-700/50 hover:border-${DESIGN_CONFIG.colors.primary}-600/50`
                  }`}
                >
                  {hashtag.label}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <p className={`${DESIGN_CONFIG.colors.text.muted} ${DESIGN_CONFIG.textSizes.filter.count}`}>
                {selectedHashtag === 'all' 
                  ? `전체 ${posts.length}개의 리뷰` 
                  : `${filteredPosts.length}개의 리뷰`}
              </p>
            </div>
          </div>

          {/* 📱 SNS 피드 그리드 */}
          <div>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage />
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-20 h-20 bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`${DESIGN_CONFIG.textSizes.empty.title} font-medium ${DESIGN_CONFIG.colors.text.secondary} mb-3`}>
                  {PAGE_CONTENT.empty.title}
                </h3>
                <p className={`${DESIGN_CONFIG.colors.text.muted} ${DESIGN_CONFIG.textSizes.empty.message}`}>
                  {PAGE_CONTENT.empty.message}
                </p>
              </div>
            ) : (
              <div className={`grid ${DESIGN_CONFIG.layout.gridCols.mobile} ${DESIGN_CONFIG.layout.gridCols.tablet} ${DESIGN_CONFIG.layout.gridCols.desktop} ${DESIGN_CONFIG.layout.spacing.card}`}>
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 🔍 모달 */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-stone-900 rounded-2xl shadow-2xl">
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 ${DESIGN_CONFIG.animations.transition}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 모달 콘텐츠 */}
            <div className="aspect-square relative">
              <Image
                src={selectedPost.imageUrl || selectedPost.media_url}
                alt={selectedPost.caption || 'Instagram post'}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-linear-to-br from-${DESIGN_CONFIG.colors.primary}-400 to-${DESIGN_CONFIG.colors.accent}-600 rounded-full flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className={`${DESIGN_CONFIG.colors.text.secondary} ${DESIGN_CONFIG.textSizes.modal.username} font-bold`}>
                    {selectedPost.username || '익명'}
                  </h3>
                  <p className={`${DESIGN_CONFIG.colors.text.muted} ${DESIGN_CONFIG.textSizes.modal.timestamp}`}>{selectedPost.timestamp}</p>
                </div>
              </div>
              
              <p className={`${DESIGN_CONFIG.colors.text.secondary} ${DESIGN_CONFIG.textSizes.modal.caption} mb-4 leading-relaxed`}>
                {selectedPost.caption || ''}
              </p>

              {selectedPost.hashtags && selectedPost.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.hashtags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className={`${DESIGN_CONFIG.textSizes.modal.hashtag} text-${DESIGN_CONFIG.colors.primary}-400 bg-${DESIGN_CONFIG.colors.primary}-900/20 px-3 py-1 rounded-full`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className={`flex items-center justify-between ${DESIGN_CONFIG.colors.text.muted} mb-6`}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{selectedPost.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{selectedPost.comments || 0}</span>
                  </div>
                </div>
              </div>

              <a
                href={selectedPost.url || selectedPost.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full bg-linear-to-r from-pink-600 to-purple-600 text-white text-center py-3 rounded-full font-bold hover:from-pink-700 hover:to-purple-700 ${DESIGN_CONFIG.animations.transition}`}
              >
                인스타그램에서 보기
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}