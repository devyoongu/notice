import React, { useState, useEffect } from 'react';

/**
 * 공지사항 게시판 컴포넌트
 * @returns {JSX.Element} 공지사항 게시판 UI 컴포넌트
 */
const NoticeBoard = () => {
  // 공지사항 데이터 상태
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 공지사항 데이터 불러오기
  useEffect(() => {
    // 데이터 가져오기 (실제 구현 시 API 호출로 변경)
    const fetchNotices = async () => {
      try {
        // 임시 데이터 (API 호출 대체)
        const sampleNotices = [
          {
            id: 1,
            title: "서비스 점검 안내",
            content: "2025년 4월 2일 오전 2시부터 4시까지 서버 점검이 있을 예정입니다.",
            author: "관리자",
            createdAt: "2025-03-30",
            isPinned: true,
            viewCount: 42
          },
          {
            id: 2,
            title: "신규 기능 업데이트 안내",
            content: "댓글 알림 기능이 추가되었습니다. 설정에서 활성화할 수 있습니다.",
            author: "시스템",
            createdAt: "2025-03-28",
            isPinned: false,
            viewCount: 128
          },
          {
            id: 3,
            title: "개인정보처리방침 개정 안내",
            content: "개인정보처리방침이 2025년 4월 1일부터 변경됩니다. 자세한 내용은 본문을 확인해주세요.",
            author: "관리자",
            createdAt: "2025-03-25",
            isPinned: true,
            viewCount: 95
          }
        ];
        
        // 데이터 저장 (지연 시간 추가)
        setTimeout(() => {
          setNotices(sampleNotices);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('공지사항을 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('공지사항 불러오기 오류:', err);
      }
    };

    fetchNotices();
  }, []);

  /**
   * 공지사항 정렬 함수
   * 고정 공지를 상단에, 그 다음 최신순으로 정렬
   */
  const sortedNotices = [...notices].sort((a, b) => {
    // 고정 공지를 상단에 배치
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // 최신 날짜순 정렬
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // 로딩 상태 표시
  if (loading) {
    return <div className="notice-loading">공지사항을 불러오는 중입니다...</div>;
  }

  // 에러 표시
  if (error) {
    return <div className="notice-error">{error}</div>;
  }

  return (
    <div className="notice-board">
      <h2>공지사항</h2>
      
      <div className="notice-list">
        {sortedNotices.length === 0 ? (
          <p className="no-notices">등록된 공지사항이 없습니다.</p>
        ) : (
          <ul>
            {sortedNotices.map(notice => (
              <li key={notice.id} className={`notice-item ${notice.isPinned ? 'pinned' : ''}`}>
                <div className="notice-header">
                  {notice.isPinned && <span className="pin-badge">중요</span>}
                  <h3 className="notice-title">{notice.title}</h3>
                  <span className="notice-date">{notice.createdAt}</span>
                </div>
                <div className="notice-content">{notice.content}</div>
                <div className="notice-footer">
                  <span className="notice-author">작성자: {notice.author}</span>
                  <span className="notice-views">조회수: {notice.viewCount}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;