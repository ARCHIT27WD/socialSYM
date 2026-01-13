"""
Backend API Tests for Long Videos Feature
Tests: CRUD operations, thumbnail_url field, YouTube ID handling
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://social-symphony.preview.emergentagent.com')
API_URL = f"{BASE_URL}/api"

class TestLongVideosAPI:
    """Test Long Videos CRUD operations and thumbnail_url field"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test data prefix for cleanup"""
        self.test_prefix = f"TEST_{uuid.uuid4().hex[:8]}"
        self.created_ids = []
        yield
        # Cleanup: Delete test-created videos
        for video_id in self.created_ids:
            try:
                requests.delete(f"{API_URL}/long-videos/{video_id}")
            except:
                pass
    
    def test_get_long_videos(self):
        """Test GET /api/long-videos returns list of videos"""
        response = requests.get(f"{API_URL}/long-videos")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET /api/long-videos returned {len(data)} videos")
        
        # Verify video structure
        if len(data) > 0:
            video = data[0]
            assert "id" in video
            assert "title" in video
            assert "youtube_id" in video
            assert "thumbnail_url" in video  # New field should exist
            assert "order" in video
            print(f"✓ Video structure verified with thumbnail_url field")
    
    def test_create_long_video_with_youtube_url(self):
        """Test creating a long video with full YouTube URL"""
        payload = {
            "title": f"{self.test_prefix}_YouTube_URL_Test",
            "youtube_id": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "thumbnail_url": "",
            "order": 99
        }
        response = requests.post(f"{API_URL}/long-videos", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        self.created_ids.append(data["id"])
        
        assert data["title"] == payload["title"]
        assert data["youtube_id"] == payload["youtube_id"]
        assert "thumbnail_url" in data
        print(f"✓ Created long video with YouTube URL: {data['id']}")
    
    def test_create_long_video_with_custom_thumbnail(self):
        """Test creating a long video with custom thumbnail_url"""
        custom_thumbnail = "https://example.com/custom-thumbnail.jpg"
        payload = {
            "title": f"{self.test_prefix}_Custom_Thumbnail_Test",
            "youtube_id": "dQw4w9WgXcQ",
            "thumbnail_url": custom_thumbnail,
            "order": 98
        }
        response = requests.post(f"{API_URL}/long-videos", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        self.created_ids.append(data["id"])
        
        assert data["title"] == payload["title"]
        assert data["youtube_id"] == payload["youtube_id"]
        assert data["thumbnail_url"] == custom_thumbnail
        print(f"✓ Created long video with custom thumbnail: {data['thumbnail_url']}")
        
        # Verify persistence via GET
        get_response = requests.get(f"{API_URL}/long-videos")
        assert get_response.status_code == 200
        videos = get_response.json()
        created_video = next((v for v in videos if v["id"] == data["id"]), None)
        assert created_video is not None
        assert created_video["thumbnail_url"] == custom_thumbnail
        print(f"✓ Custom thumbnail persisted correctly in database")
    
    def test_create_long_video_without_thumbnail(self):
        """Test creating a long video without thumbnail_url (should default to empty)"""
        payload = {
            "title": f"{self.test_prefix}_No_Thumbnail_Test",
            "youtube_id": "dQw4w9WgXcQ",
            "order": 97
        }
        response = requests.post(f"{API_URL}/long-videos", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        self.created_ids.append(data["id"])
        
        # thumbnail_url should exist and be empty string
        assert "thumbnail_url" in data
        assert data["thumbnail_url"] == "" or data["thumbnail_url"] is None
        print(f"✓ Created long video without thumbnail - defaults correctly")
    
    def test_delete_long_video(self):
        """Test DELETE /api/long-videos/{id}"""
        # First create a video
        payload = {
            "title": f"{self.test_prefix}_Delete_Test",
            "youtube_id": "dQw4w9WgXcQ",
            "order": 96
        }
        create_response = requests.post(f"{API_URL}/long-videos", json=payload)
        assert create_response.status_code == 200
        video_id = create_response.json()["id"]
        
        # Delete the video
        delete_response = requests.delete(f"{API_URL}/long-videos/{video_id}")
        assert delete_response.status_code == 200
        print(f"✓ Deleted long video: {video_id}")
        
        # Verify deletion
        get_response = requests.get(f"{API_URL}/long-videos")
        videos = get_response.json()
        deleted_video = next((v for v in videos if v["id"] == video_id), None)
        assert deleted_video is None
        print(f"✓ Verified video no longer exists in database")
    
    def test_existing_videos_have_youtube_urls(self):
        """Verify existing videos in DB have full YouTube URLs that need parsing"""
        response = requests.get(f"{API_URL}/long-videos")
        assert response.status_code == 200
        videos = response.json()
        
        youtube_url_count = 0
        for video in videos:
            if "youtube.com" in video["youtube_id"] or "youtu.be" in video["youtube_id"]:
                youtube_url_count += 1
        
        print(f"✓ Found {youtube_url_count}/{len(videos)} videos with full YouTube URLs")
        # This confirms the extractYouTubeId function is needed


class TestShortVideosAPI:
    """Test Short Videos API for comparison"""
    
    def test_get_short_videos(self):
        """Test GET /api/short-videos"""
        response = requests.get(f"{API_URL}/short-videos")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET /api/short-videos returned {len(data)} videos")
        
        if len(data) > 0:
            video = data[0]
            assert "thumbnail_url" in video
            print(f"✓ Short videos have thumbnail_url field")


class TestAdminLogin:
    """Test Admin authentication"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(f"{API_URL}/admin/login", json={"password": "admin123"})
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        print(f"✓ Admin login successful")
    
    def test_admin_login_failure(self):
        """Test admin login with wrong password"""
        response = requests.post(f"{API_URL}/admin/login", json={"password": "wrongpassword"})
        assert response.status_code == 401
        print(f"✓ Admin login correctly rejects wrong password")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
