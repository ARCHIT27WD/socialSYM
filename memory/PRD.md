# Soccial Symphony - Product Requirements Document

## Original Problem Statement
Build a dark-themed website for a podcast company named "Soccial Symphony" with:
- **Main Website**: About section, Short Videos (Reels), Long Videos (YouTube), Services, Testimonials, Enquiry Form, Footer
- **Admin Dashboard**: Password-protected panel to manage all content
- **Integrations**: Email notifications via Resend for new enquiries

## Company Information
- Co-founded by Neeraj Vaid and Pijush Singha
- Tagline: "Hit the Right Note with your Brand!"
- Services: Podcast, Editing, YouTube Thumbnail, Social Media Handling

## Architecture
```
/app/
├── backend/
│   ├── server.py       # FastAPI app with all API endpoints
│   └── .env           # MONGO_URL, RESEND_API_KEY, NOTIFICATION_EMAIL
├── frontend/
│   ├── src/
│   │   ├── components/  # All section components
│   │   ├── pages/       # LandingPage, AdminDashboard
│   │   └── App.js       # Router setup
│   └── .env            # REACT_APP_BACKEND_URL
└── memory/
    └── PRD.md          # This file
```

## Database Schema (MongoDB)
- `short_videos`: { id, title, url, thumbnail_url, order, created_at }
- `long_videos`: { id, title, youtube_id, thumbnail_url, order, created_at }
- `testimonials`: { id, name, role, content, rating, avatar_url, created_at }
- `enquiries`: { id, name, email, contact, comment, status, created_at }

## API Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET/POST /api/short-videos` - Manage reels
- `GET/POST /api/long-videos` - Manage YouTube videos
- `DELETE /api/short-videos/{id}` - Delete reel
- `DELETE /api/long-videos/{id}` - Delete YouTube video
- `GET/POST /api/testimonials` - Manage testimonials
- `PUT/DELETE /api/testimonials/{id}` - Update/delete testimonial
- `GET/POST /api/enquiries` - Manage enquiries

## Admin Credentials
- URL: `/admin-secret`
- Password: `admin123`

---

## What's Been Implemented

### Core Features (Complete)
- [x] Dark-themed landing page with amber/gold accents
- [x] Sticky Navbar with smooth scroll navigation
- [x] Hero section with company branding
- [x] About section with background image overlay
- [x] Short Videos (Reels) section with carousel
- [x] Featured Videos (YouTube) section with 2xN grid
- [x] Services section (Podcast, Editing, Thumbnail, Social Media)
- [x] Testimonials section with star ratings
- [x] Enquiry form with email notification to admin
- [x] Footer with social media links

### Admin Dashboard (Complete)
- [x] Password-protected login
- [x] Short Videos tab with thumbnail URL support
- [x] Long Videos tab with thumbnail URL support (Added Jan 13, 2026)
- [x] Testimonials management
- [x] Enquiries viewer

### Integrations
- [x] Resend - Email notifications to soccialsymphony@gmail.com

---

## Recently Completed (Jan 13, 2026)

### Bug Fix: YouTube Video Links
- **Issue**: Clicking on Featured Videos didn't open YouTube
- **Root Cause**: Database stored full URLs in `youtube_id` field (e.g., `https://youtube.com/watch?v=ID`)
- **Fix**: Added `extractYouTubeId()` function to parse various URL formats
- **Status**: TESTED & VERIFIED

### Feature: Thumbnail URL for Long Videos
- **Task**: Add custom thumbnail support for Featured Videos (like Short Videos)
- **Changes**:
  - Backend model already had `thumbnail_url` field
  - Updated Admin Dashboard with Thumbnail URL input
  - Updated LongVideosSection to use custom thumbnail with YouTube fallback
- **Status**: TESTED & VERIFIED

---

## Upcoming Tasks (P1)
- [ ] Send confirmation/auto-reply email to enquiry submitters

## Future/Backlog
- [ ] Refactor AdminDashboard.js into smaller tab components
- [ ] Add video reordering (drag & drop) in admin
- [ ] Add testimonial avatars support
- [ ] Mobile responsiveness audit

---

## Test Reports
- `/app/test_reports/iteration_1.json` - Long Videos feature tests (100% pass)
- `/app/tests/test_long_videos_api.py` - Backend API tests
