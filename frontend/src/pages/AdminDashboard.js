import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Trash2, Plus, Edit, Star, LogOut } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [shortVideos, setShortVideos] = useState([]);
  const [longVideos, setLongVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        localStorage.setItem('admin_token', response.data.token);
        setIsAuthenticated(true);
        toast.success('Login successful!');
        fetchAllData();
      }
    } catch (error) {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [shortRes, longRes, testimonialRes, enquiryRes] = await Promise.all([
        axios.get(`${API}/short-videos`),
        axios.get(`${API}/long-videos`),
        axios.get(`${API}/testimonials`),
        axios.get(`${API}/enquiries`)
      ]);
      setShortVideos(shortRes.data);
      setLongVideos(longRes.data);
      setTestimonials(testimonialRes.data);
      setEnquiries(enquiryRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const addShortVideo = async (data) => {
    try {
      await axios.post(`${API}/short-videos`, data);
      toast.success('Short video added!');
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add video');
    }
  };

  const deleteShortVideo = async (id) => {
    try {
      await axios.delete(`${API}/short-videos/${id}`);
      toast.success('Video deleted');
      fetchAllData();
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  const addLongVideo = async (data) => {
    try {
      await axios.post(`${API}/long-videos`, data);
      toast.success('Long video added!');
      fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add video');
    }
  };

  const deleteLongVideo = async (id) => {
    try {
      await axios.delete(`${API}/long-videos/${id}`);
      toast.success('Video deleted');
      fetchAllData();
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  const addTestimonial = async (data) => {
    try {
      await axios.post(`${API}/testimonials`, data);
      toast.success('Testimonial added!');
      fetchAllData();
    } catch (error) {
      toast.error('Failed to add testimonial');
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`${API}/testimonials/${id}`);
      toast.success('Testimonial deleted');
      fetchAllData();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
        <Card className="w-full max-w-md" style={{ background: '#0A0A0A', borderColor: '#27272A' }}>
          <CardHeader>
            <CardTitle className="text-2xl" style={{ color: '#F59E0B', fontFamily: 'Playfair Display, serif' }}>Admin Login</CardTitle>
            <CardDescription style={{ color: '#A1A1AA' }}>Enter password to access dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" style={{ color: '#FAFAFA' }}>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="admin-login-password-input"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                />
              </div>
              <Button type="submit" className="w-full" data-testid="admin-login-submit-button" style={{ background: '#F59E0B', color: '#000' }}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#F59E0B', fontFamily: 'Playfair Display, serif' }}>Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" data-testid="admin-logout-button">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="short-videos" className="space-y-4">
          <TabsList style={{ background: '#0A0A0A', borderColor: '#27272A' }}>
            <TabsTrigger value="short-videos" data-testid="tab-short-videos">Short Videos ({shortVideos.length}/10)</TabsTrigger>
            <TabsTrigger value="long-videos" data-testid="tab-long-videos">Long Videos ({longVideos.length}/10)</TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="enquiries" data-testid="tab-enquiries">Enquiries ({enquiries.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="short-videos">
            <ShortVideosTab videos={shortVideos} onAdd={addShortVideo} onDelete={deleteShortVideo} />
          </TabsContent>

          <TabsContent value="long-videos">
            <LongVideosTab videos={longVideos} onAdd={addLongVideo} onDelete={deleteLongVideo} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsTab testimonials={testimonials} onAdd={addTestimonial} onDelete={deleteTestimonial} />
          </TabsContent>

          <TabsContent value="enquiries">
            <EnquiriesTab enquiries={enquiries} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ShortVideosTab = ({ videos, onAdd, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', order: 0 });

  const handleSubmit = () => {
    if (!formData.title || !formData.url) {
      toast.error('Please fill all fields');
      return;
    }
    onAdd(formData);
    setFormData({ title: '', url: '', order: 0 });
    setOpen(false);
  };

  return (
    <Card style={{ background: '#0A0A0A', borderColor: '#27272A' }}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle style={{ color: '#FAFAFA' }}>Short Videos (Reels)</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-testid="add-short-video-button" style={{ background: '#F59E0B', color: '#000' }}>
                <Plus className="mr-2 h-4 w-4" /> Add Video
              </Button>
            </DialogTrigger>
            <DialogContent style={{ background: '#0A0A0A', borderColor: '#27272A', color: '#FAFAFA' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#F59E0B' }}>Add Short Video</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    data-testid="short-video-title-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="url">Video URL</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    data-testid="short-video-url-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} data-testid="submit-short-video-button" style={{ background: '#F59E0B', color: '#000' }}>Add Video</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: '#27272A' }}>
              <TableHead style={{ color: '#A1A1AA' }}>Title</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>URL</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Order</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id} style={{ borderColor: '#27272A' }}>
                <TableCell style={{ color: '#FAFAFA' }}>{video.title}</TableCell>
                <TableCell style={{ color: '#A1A1AA' }}>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {video.url.substring(0, 40)}...
                  </a>
                </TableCell>
                <TableCell style={{ color: '#FAFAFA' }}>{video.order}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(video.id)}
                    data-testid={`delete-short-video-${video.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {videos.length === 0 && (
          <div className="text-center py-8" style={{ color: '#A1A1AA' }}>No videos added yet</div>
        )}
      </CardContent>
    </Card>
  );
};

const LongVideosTab = ({ videos, onAdd, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', youtube_id: '', order: 0 });

  const handleSubmit = () => {
    if (!formData.title || !formData.youtube_id) {
      toast.error('Please fill all fields');
      return;
    }
    onAdd(formData);
    setFormData({ title: '', youtube_id: '', order: 0 });
    setOpen(false);
  };

  return (
    <Card style={{ background: '#0A0A0A', borderColor: '#27272A' }}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle style={{ color: '#FAFAFA' }}>Long Videos (YouTube)</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-testid="add-long-video-button" style={{ background: '#F59E0B', color: '#000' }}>
                <Plus className="mr-2 h-4 w-4" /> Add Video
              </Button>
            </DialogTrigger>
            <DialogContent style={{ background: '#0A0A0A', borderColor: '#27272A', color: '#FAFAFA' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#F59E0B' }}>Add Long Video</DialogTitle>
                <DialogDescription style={{ color: '#A1A1AA' }}>Enter YouTube video ID (e.g., dQw4w9WgXcQ)</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    data-testid="long-video-title-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="youtube_id">YouTube Video ID</Label>
                  <Input
                    id="youtube_id"
                    value={formData.youtube_id}
                    onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                    data-testid="long-video-id-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} data-testid="submit-long-video-button" style={{ background: '#F59E0B', color: '#000' }}>Add Video</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: '#27272A' }}>
              <TableHead style={{ color: '#A1A1AA' }}>Title</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>YouTube ID</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Order</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id} style={{ borderColor: '#27272A' }}>
                <TableCell style={{ color: '#FAFAFA' }}>{video.title}</TableCell>
                <TableCell style={{ color: '#A1A1AA' }}>{video.youtube_id}</TableCell>
                <TableCell style={{ color: '#FAFAFA' }}>{video.order}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(video.id)}
                    data-testid={`delete-long-video-${video.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {videos.length === 0 && (
          <div className="text-center py-8" style={{ color: '#A1A1AA' }}>No videos added yet</div>
        )}
      </CardContent>
    </Card>
  );
};

const TestimonialsTab = ({ testimonials, onAdd, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', content: '', rating: 5, avatar_url: '' });

  const handleSubmit = () => {
    if (!formData.name || !formData.content) {
      toast.error('Please fill required fields');
      return;
    }
    onAdd(formData);
    setFormData({ name: '', role: '', content: '', rating: 5, avatar_url: '' });
    setOpen(false);
  };

  return (
    <Card style={{ background: '#0A0A0A', borderColor: '#27272A' }}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle style={{ color: '#FAFAFA' }}>Testimonials</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-testid="add-testimonial-button" style={{ background: '#F59E0B', color: '#000' }}>
                <Plus className="mr-2 h-4 w-4" /> Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent style={{ background: '#0A0A0A', borderColor: '#27272A', color: '#FAFAFA' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#F59E0B' }}>Add Testimonial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="testimonial-name-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    data-testid="testimonial-role-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    data-testid="testimonial-content-input"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
                <div>
                  <Label htmlFor="avatar_url">Avatar URL (optional)</Label>
                  <Input
                    id="avatar_url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#FAFAFA' }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} data-testid="submit-testimonial-button" style={{ background: '#F59E0B', color: '#000' }}>Add Testimonial</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: '#27272A' }}>
              <TableHead style={{ color: '#A1A1AA' }}>Name</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Role</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Content</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Rating</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id} style={{ borderColor: '#27272A' }}>
                <TableCell style={{ color: '#FAFAFA' }}>{testimonial.name}</TableCell>
                <TableCell style={{ color: '#A1A1AA' }}>{testimonial.role}</TableCell>
                <TableCell style={{ color: '#FAFAFA' }}>{testimonial.content.substring(0, 50)}...</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} weight="fill" color="#F59E0B" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(testimonial.id)}
                    data-testid={`delete-testimonial-${testimonial.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {testimonials.length === 0 && (
          <div className="text-center py-8" style={{ color: '#A1A1AA' }}>No testimonials added yet</div>
        )}
      </CardContent>
    </Card>
  );
};

const EnquiriesTab = ({ enquiries }) => {
  return (
    <Card style={{ background: '#0A0A0A', borderColor: '#27272A' }}>
      <CardHeader>
        <CardTitle style={{ color: '#FAFAFA' }}>Enquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: '#27272A' }}>
              <TableHead style={{ color: '#A1A1AA' }}>Name</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Email</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Contact</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Comment</TableHead>
              <TableHead style={{ color: '#A1A1AA' }}>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry.id} style={{ borderColor: '#27272A' }}>
                <TableCell style={{ color: '#FAFAFA' }}>{enquiry.name}</TableCell>
                <TableCell style={{ color: '#A1A1AA' }}>{enquiry.email}</TableCell>
                <TableCell style={{ color: '#FAFAFA' }}>{enquiry.contact}</TableCell>
                <TableCell style={{ color: '#FAFAFA' }}>{enquiry.comment.substring(0, 50)}...</TableCell>
                <TableCell style={{ color: '#A1A1AA' }}>
                  {new Date(enquiry.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {enquiries.length === 0 && (
          <div className="text-center py-8" style={{ color: '#A1A1AA' }}>No enquiries yet</div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;