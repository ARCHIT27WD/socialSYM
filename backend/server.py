from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class ShortVideo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    url: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ShortVideoCreate(BaseModel):
    title: str
    url: str
    order: int = 0

class LongVideo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    youtube_id: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LongVideoCreate(BaseModel):
    title: str
    youtube_id: str
    order: int = 0

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: Optional[str] = ""
    content: str
    rating: int = 5
    avatar_url: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    name: str
    role: Optional[str] = ""
    content: str
    rating: int = 5
    avatar_url: Optional[str] = ""

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = None
    avatar_url: Optional[str] = None

class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    contact: str
    comment: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    contact: str
    comment: str

class AdminLogin(BaseModel):
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    token: str

# Admin Routes
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(login_data: AdminLogin):
    admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    if login_data.password == admin_password:
        return {"success": True, "token": "admin-token"}
    raise HTTPException(status_code=401, detail="Invalid password")

# Short Videos Routes
@api_router.get("/short-videos", response_model=List[ShortVideo])
async def get_short_videos():
    videos = await db.short_videos.find({}, {"_id": 0}).sort("order", 1).to_list(10)
    for video in videos:
        if isinstance(video['created_at'], str):
            video['created_at'] = datetime.fromisoformat(video['created_at'])
    return videos

@api_router.post("/short-videos", response_model=ShortVideo)
async def create_short_video(video: ShortVideoCreate):
    count = await db.short_videos.count_documents({})
    if count >= 10:
        raise HTTPException(status_code=400, detail="Maximum 10 short videos allowed")
    
    video_obj = ShortVideo(**video.model_dump())
    doc = video_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.short_videos.insert_one(doc)
    return video_obj

@api_router.delete("/short-videos/{video_id}")
async def delete_short_video(video_id: str):
    result = await db.short_videos.delete_one({"id": video_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"success": True}

# Long Videos Routes
@api_router.get("/long-videos", response_model=List[LongVideo])
async def get_long_videos():
    videos = await db.long_videos.find({}, {"_id": 0}).sort("order", 1).to_list(10)
    for video in videos:
        if isinstance(video['created_at'], str):
            video['created_at'] = datetime.fromisoformat(video['created_at'])
    return videos

@api_router.post("/long-videos", response_model=LongVideo)
async def create_long_video(video: LongVideoCreate):
    count = await db.long_videos.count_documents({})
    if count >= 10:
        raise HTTPException(status_code=400, detail="Maximum 10 long videos allowed")
    
    video_obj = LongVideo(**video.model_dump())
    doc = video_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.long_videos.insert_one(doc)
    return video_obj

@api_router.delete("/long-videos/{video_id}")
async def delete_long_video(video_id: str):
    result = await db.long_videos.delete_one({"id": video_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"success": True}

# Testimonials Routes
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for testimonial in testimonials:
        if isinstance(testimonial['created_at'], str):
            testimonial['created_at'] = datetime.fromisoformat(testimonial['created_at'])
    return testimonials

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    testimonial_obj = Testimonial(**testimonial.model_dump())
    doc = testimonial_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.testimonials.insert_one(doc)
    return testimonial_obj

@api_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, update_data: TestimonialUpdate):
    existing = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    if update_dict:
        await db.testimonials.update_one({"id": testimonial_id}, {"$set": update_dict})
    
    updated = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if isinstance(updated['created_at'], str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return Testimonial(**updated)

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"success": True}

# Enquiries Routes
@api_router.get("/enquiries", response_model=List[Enquiry])
async def get_enquiries():
    enquiries = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for enquiry in enquiries:
        if isinstance(enquiry['created_at'], str):
            enquiry['created_at'] = datetime.fromisoformat(enquiry['created_at'])
    return enquiries

@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(enquiry: EnquiryCreate):
    enquiry_obj = Enquiry(**enquiry.model_dump())
    doc = enquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.enquiries.insert_one(doc)
    return enquiry_obj

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()