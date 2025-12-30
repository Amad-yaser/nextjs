'use client';

// Admin Dashboard - لوحة الإدارة

import { useState, useEffect } from 'react';
import { 
  Users, 
  BarChart3, 
  FileText, 
  ImageIcon, 
  Globe, 
  Settings, 
  MessageSquare, 
  Shield, 
  Clock, 
  Database,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Home,
  LogOut,
  Bell,
  User,
  Zap,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Key,
  AlertTriangle,
  DownloadCloud,
  Server,
  Monitor,
  Smartphone,
  Globe2,
  Package,
  CreditCard,
  ShoppingBag,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Tag,
  Layers,
  Grid3X3,
  List,
  Layout,
  Palette,
  Type,
  Image as ImageIcon2,
  Video,
  Music,
  File,
  Folder,
  FolderOpen,
  Archive,
  Trash,
  Copy,
  Move,
  Link,
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCw,
  Save,
  Printer,
  Share,
  UploadCloud,
  Cloud,
  CloudRain,
  Sun,
  Moon,
  Terminal,
  Code,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Bug,
  Lightbulb,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Diamond,
  Coins,
  DollarSign,
  Euro,
  PoundSterling,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  Thermometer,
  Gauge,
  Timer,
  Hourglass,
  Sunrise,
  Sunset,
  CloudSnow,
  CloudDrizzle,
  Wind,
  Compass,
  Map,
  Navigation,
  Route,
  Flag,
  BookmarkCheck,
  CheckSquare,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Star as StarIcon,
  Heart as HeartIcon,
  HelpCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

import { useSession } from '@/components/admin/SessionManager';
// Enhanced Admin Components
import { NotificationsPanel } from '@/components/admin/NotificationsPanel';
import { DataExport } from '@/components/admin/DataExport';
import { AdvancedFilters } from '@/components/admin/AdvancedFilters';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { RoleManagement } from '@/components/admin/RoleManagement';
import { BulkOperations } from '@/components/admin/BulkOperations';
import { FileManager } from '@/components/admin/FileManager';
import { EmailTemplate } from '@/components/admin/EmailTemplate';
import { SystemSettings } from '@/components/admin/SystemSettings';
import { UserActivity } from '@/components/admin/UserActivity';
import { BackupManager } from '@/components/admin/BackupManager';
import { PerformanceMonitor } from '@/components/admin/PerformanceMonitor';
import { ContentScheduler } from '@/components/admin/ContentScheduler';
import { ApiKeys } from '@/components/admin/ApiKeys';
import { MaintenanceMode } from '@/components/admin/MaintenanceMode';
import { AdvancedAnalytics } from '@/components/admin/AdvancedAnalytics';
import { RealTimeMonitor } from '@/components/admin/RealTimeMonitor';
import { SmartNotifications } from '@/components/admin/SmartNotifications';
import { SecurityAudit } from '@/components/admin/SecurityAudit';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  avatar?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  preferences?: {
    language: string;
    timezone: string;
    notifications: boolean;
  };
  subscription?: {
    plan: string;
    status: string;
    expiresAt: string;
  };
}

interface NewsItem {
  id: string;
  text: string;
  icon: string;
  active: boolean;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  tags?: string[];
  author?: string;
  views?: number;
  likes?: number;
  shares?: number;
}

interface BackgroundImage {
  id: string;
  url: string;
  title: string;
  active: boolean;
  order: number;
  createdAt: string;
  category?: string;
  tags?: string[];
  size?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  fileSize?: number;
  format?: string;
}

interface WebsiteTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  provider: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  features?: string[];
  technologies?: string[];
  demoUrl?: string;
  downloadUrl?: string;
  screenshots?: string[];
  documentation?: string;
  support?: {
    email: string;
    phone: string;
    website: string;
  };
  license?: string;
  lastUpdated?: string;
}

interface AdminWebsiteCard {
  id: string;
  title: string;
  description?: string;
  category: string;
  url: string;
  technologies?: string[];
  images?: string[];
  badges?: string[];
  tags?: string[];
  featured?: boolean;
  client?: string;
  hidden?: boolean;
  displayOrder?: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  active: boolean;
  order: number;
  category?: string;
  price?: number;
  features?: string[];
  provider?: string;
  rating?: number;
  reviews?: number;
  availability?: {
    days: string[];
    hours: string;
  };
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  attachments?: string[];
  assignedTo?: string;
  tags?: string[];
}

interface SystemLog {
  id: string;
  action: string;
  user: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  details: string;
  module?: string;
  duration?: number;
  userAgent?: string;
  referer?: string;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalTemplates: number;
  totalMessages: number;
  totalRevenue: number;
  monthlyGrowth: number;
  serverUptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  bandwidthUsage: number;
  errorRate: number;
  responseTime: number;
  activeConnections: number;
  cacheHitRate: number;
  databaseConnections: number;
  queueLength: number;
}

export default function AdminDashboard() {
  const { logout } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [showAddSiteDialog, setShowAddSiteDialog] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // New Site Form States
  const [newSite, setNewSite] = useState({
    title: '',
    description: '',
    category: 'ecommerce',
    price: '',
    provider: '',
    features: [] as string[],
    technologies: [] as string[],
    demoUrl: '',
    images: [] as File[]
  });
  const [isUploading, setIsUploading] = useState(false);
  
  // Data states
  const [users, setUsers] = useState<User[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);
  const [websiteTemplates, setWebsiteTemplates] = useState<WebsiteTemplate[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [ciarWebsites, setCiarWebsites] = useState<AdminWebsiteCard[]>([]);
  const [isWebsiteDialogOpen, setIsWebsiteDialogOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<AdminWebsiteCard | null>(null);
  const [websiteActionLoading, setWebsiteActionLoading] = useState(false);
  
  // Enhanced Statistics
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalTemplates: 0,
    totalMessages: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    serverUptime: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    bandwidthUsage: 0,
    errorRate: 0,
    responseTime: 0,
    activeConnections: 0,
    cacheHitRate: 0,
    databaseConnections: 0,
    queueLength: 0
  });

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        serverUptime: Math.min(100, prev.serverUptime + Math.random() * 0.1),
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 3)),
        activeConnections: Math.max(0, prev.activeConnections + Math.floor((Math.random() - 0.5) * 10)),
        responseTime: Math.max(0, Math.min(1000, prev.responseTime + (Math.random() - 0.5) * 50))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchUsers(),
        fetchNewsItems(),
        fetchBackgroundImages(),
        fetchWebsiteTemplates(),
        fetchServices(),
        fetchContactMessages(),
        fetchSystemLogs(),
        fetchStats(),
        fetchCiarWebsites()
      ]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchNewsItems = async () => {
    try {
      const response = await fetch('/api/admin/news');
      if (response.ok) {
        const data = await response.json();
        setNewsItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch news items:', error);
    }
  };

  const fetchBackgroundImages = async () => {
    try {
      const response = await fetch('/api/admin/background-images');
      if (response.ok) {
        const data = await response.json();
        setBackgroundImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch background images:', error);
    }
  };

  const fetchWebsiteTemplates = async () => {
    try {
      const response = await fetch('/api/admin/website-templates');
      if (response.ok) {
        const data = await response.json();
        setWebsiteTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch website templates:', error);
    }
  };

  const fetchCiarWebsites = async () => {
    try {
      const response = await fetch('/api/admin/websites');
      if (response.ok) {
        const data: AdminWebsiteCard[] = await response.json();
        const ordered = data.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        setCiarWebsites(ordered);
        setStats(prev => ({
          ...prev,
          totalTemplates: ordered.filter(site => !site.hidden).length
        }));
      }
    } catch (error) {
      console.error('Failed to fetch CIAR websites:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await fetch('/api/admin/contact-messages');
      if (response.ok) {
        const data = await response.json();
        setContactMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    }
  };

  const fetchSystemLogs = async () => {
    try {
      const response = await fetch('/api/admin/system-logs');
      if (response.ok) {
        const data = await response.json();
        setSystemLogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch system logs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    try {
      await fetchAllData();
    } finally {
      setRefreshing(false);
    }
  };

  const getTabIcon = (tabValue: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      overview: <BarChart3 className="w-4 h-4" />,
      analytics: <TrendingUp className="w-4 h-4" />,
      users: <Users className="w-4 h-4" />,
      content: <FileText className="w-4 h-4" />,
      'add-site': <Plus className="w-4 h-4" />,
      security: <Lock className="w-4 h-4" />,
      settings: <Settings className="w-4 h-4" />,
      files: <Database className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      activity: <Clock className="w-4 h-4" />,
      performance: <Zap className="w-4 h-4" />,
      backup: <DownloadCloud className="w-4 h-4" />,
      api: <Key className="w-4 h-4" />,
      maintenance: <Settings className="w-4 h-4" />,
      realtime: <Activity className="w-4 h-4" />,
      scheduler: <Calendar className="w-4 h-4" />,
      roles: <Shield className="w-4 h-4" />
    };
    return iconMap[tabValue] || <FileText className="w-4 h-4" />;
  };

  const getTabLabel = (tabValue: string) => {
    const labelMap: Record<string, string> = {
      overview: 'نظرة عامة',
      analytics: 'التحليلات',
      users: 'المستخدمون',
      content: 'المحتوى',
      'add-site': 'إضافة موقع',
      security: 'الأمان',
      settings: 'الإعدادات',
      files: 'الملفات',
      email: 'البريد',
      activity: 'النشاط',
      performance: 'الأداء',
      backup: 'النسخ الاحتياطي',
      api: 'API',
      maintenance: 'الصيانة',
      realtime: 'المراقبة المباشرة',
      scheduler: 'الجدولة',
      roles: 'الأدوار'
    };
    return labelMap[tabValue] || tabValue;
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewSite(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  // Remove image from list
  const removeImage = (index: number) => {
    setNewSite(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleAddSite = async () => {
    if (!newSite.title || !newSite.description || !newSite.price) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsUploading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', newSite.title);
      formData.append('description', newSite.description);
      formData.append('category', newSite.category);
      formData.append('price', newSite.price);
      formData.append('provider', newSite.provider);
      formData.append('features', JSON.stringify(newSite.features));
      formData.append('technologies', JSON.stringify(newSite.technologies));
      formData.append('demoUrl', newSite.demoUrl);

      // Add images
      newSite.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const response = await fetch('/api/admin/add-website', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert('تم إضافة الموقع بنجاح!');
        setShowAddSiteDialog(false);
        // Reset form
        setNewSite({
          title: '',
          description: '',
          category: 'ecommerce',
          price: '',
          provider: '',
          features: [],
          technologies: [],
          demoUrl: '',
          images: []
        });
        // Refresh website templates
        await fetchWebsiteTemplates();
      } else {
        throw new Error('Failed to add website');
      }
    } catch (error) {
      console.error('Error adding site:', error);
      alert('حدث خطأ أثناء إضافة الموقع');
    } finally {
      setIsUploading(false);
    }
  };

  const handleWebsiteVisibility = async (id: string, visible: boolean) => {
    try {
      await fetch('/api/admin/websites', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, hidden: !visible })
      });
      await fetchCiarWebsites();
    } catch (error) {
      console.error('Failed to toggle website visibility:', error);
    }
  };

  const openWebsiteEditor = (website: AdminWebsiteCard) => {
    setEditingWebsite({ ...website });
    setIsWebsiteDialogOpen(true);
  };

  const handleWebsiteFieldChange = (field: keyof AdminWebsiteCard, value: any) => {
    setEditingWebsite(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const saveWebsiteChanges = async () => {
    if (!editingWebsite) return;
    setWebsiteActionLoading(true);
    try {
      const payload = {
        ...editingWebsite,
        technologies: (editingWebsite.technologies || []).map(tech => tech.trim()).filter(Boolean),
        images: (editingWebsite.images || []).map(img => img.trim()).filter(Boolean),
        badges: (editingWebsite.badges || []).map(badge => badge.trim()).filter(Boolean),
        tags: (editingWebsite.tags || []).map(tag => tag.trim()).filter(Boolean)
      };

      await fetch('/api/admin/websites', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setIsWebsiteDialogOpen(false);
      setEditingWebsite(null);
      await fetchCiarWebsites();
    } catch (error) {
      console.error('Failed to save website changes:', error);
    } finally {
      setWebsiteActionLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  const visibleWebsitesCount = ciarWebsites.filter(site => !site.hidden).length;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; text: string }> = {
      active: { variant: "default", text: "نشط" },
      inactive: { variant: "secondary", text: "غير نشط" },
      suspended: { variant: "destructive", text: "معلق" },
      unread: { variant: "destructive", text: "غير مقروء" },
      read: { variant: "secondary", text: "مقروء" },
      replied: { variant: "default", text: "تم الرد" },
      high: { variant: "destructive", text: "عالي" },
      medium: { variant: "secondary", text: "متوسط" },
      low: { variant: "outline", text: "منخفض" },
      success: { variant: "default", text: "نجح" },
      error: { variant: "destructive", text: "خطأ" },
      warning: { variant: "secondary", text: "تحذير" }
    };
    const config = variants[status] || variants.active;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      admin: "bg-red-100 text-red-800",
      moderator: "bg-blue-100 text-blue-800",
      user: "bg-green-100 text-green-800",
      premium: "bg-purple-100 text-purple-800",
      enterprise: "bg-yellow-100 text-yellow-800"
    };
    return <Badge className={variants[role] || variants.user}>{role}</Badge>;
  };

  const getSystemHealthColor = (value: number, type: 'cpu' | 'memory' | 'disk') => {
    if (type === 'cpu' || type === 'memory') {
      if (value > 80) return 'text-red-600';
      if (value > 60) return 'text-yellow-600';
      return 'text-green-600';
    } else {
      if (value > 90) return 'text-red-600';
      if (value > 70) return 'text-yellow-600';
      return 'text-green-600';
    }
  };

  const getProgressBarColor = (value: number) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <TooltipProvider>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`} dir="rtl">
        {/* Enhanced Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-50`}>
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      لوحة التحكم المتقدمة
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">نظام إدارة متكامل</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-sm text-green-600 font-medium">متصل</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* Refresh Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshData}
                  disabled={refreshing}
                  className="hidden sm:flex"
                >
                  <RefreshCw className={`w-4 h-4 ml-2 ${refreshing ? 'animate-spin' : ''}`} />
                  تحديث
                </Button>

                {/* Quick Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة سريع
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setShowAddSiteDialog(true)}>
                      <Globe className="w-4 h-4 ml-2" />
                      موقع جديد
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 ml-2" />
                      مستخدم جديد
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="w-4 h-4 ml-2" />
                      محتوى جديد
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center space-x-1 space-x-reverse bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                {/* Compact Mode */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCompactMode(!compactMode)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>

                {/* Notifications */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsNotificationsOpen(true)}
                  className="relative"
                >
                  <Bell className="w-4 h-4 ml-2" />
                  الإشعارات
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 ml-2" />
                      المدير
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <User className="w-4 h-4 ml-2" />
                      الملف الشخصي
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 ml-2" />
                      الإعدادات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {/* Users Card */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} transition-all duration-300 hover:scale-105 border-0 shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-bold text-gray-600 dark:text-gray-300">إجمالي المستخدمين</CardTitle>
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString('ar-SA')}</div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
                    <span className="text-xs text-gray-500">من الشهر الماضي</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style={{width: `${Math.min(75, stats.totalUsers / 10)}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Users Card */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} transition-all duration-300 hover:scale-105 border-0 shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-bold text-gray-600 dark:text-gray-300">المستخدمون النشطون</CardTitle>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers.toLocaleString('ar-SA')}</div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">+12%</span>
                    <span className="text-xs text-gray-500">من الأسبوع الماضي</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" style={{width: `${Math.min(85, (stats.activeUsers / stats.totalUsers) * 100)}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates Card */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} transition-all duration-300 hover:scale-105 border-0 shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-bold text-gray-600 dark:text-gray-300">قوالب المواقع</CardTitle>
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTemplates}</div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Plus className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600 font-medium">+5</span>
                    <span className="text-xs text-gray-500">قوالب جديدة</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500" style={{width: `${Math.min(60, stats.totalTemplates * 2)}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages Card */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} transition-all duration-300 hover:scale-105 border-0 shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-bold text-gray-600 dark:text-gray-300">الرسائل</CardTitle>
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center relative">
                  <MessageSquare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  {contactMessages.filter(m => m.status === 'unread').length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <AlertCircle className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600 font-medium">
                      {contactMessages.filter(m => m.status === 'unread').length}
                    </span>
                    <span className="text-xs text-gray-500">رسائل غير مقروءة</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500" style={{width: `${Math.min(30, stats.totalMessages / 5)}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Server Uptime Card */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} transition-all duration-300 hover:scale-105 border-0 shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-bold text-gray-600 dark:text-gray-300">وقت التشغيل</CardTitle>
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                  <Server className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.serverUptime.toFixed(1)}%</div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">ممتاز</span>
                    <span className="text-xs text-gray-500">أداء الخادم</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`bg-gradient-to-r h-2 rounded-full transition-all duration-500 ${
                      stats.serverUptime > 95 ? 'from-emerald-500 to-emerald-600' : 
                      stats.serverUptime > 90 ? 'from-yellow-500 to-yellow-600' : 
                      'from-red-500 to-red-600'
                    }`} style={{width: `${stats.serverUptime}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CPU Usage Card */}
            <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white hover:shadow-xl'} transition-all duration-300 hover:scale-105 border-0 shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-bold text-gray-600 dark:text-gray-300">استخدام المعالج</CardTitle>
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`text-2xl font-bold ${getSystemHealthColor(stats.cpuUsage, 'cpu')}`}>
                    {stats.cpuUsage.toFixed(1)}%
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Activity className="w-3 h-3 text-red-500" />
                    <span className={`text-xs font-medium ${getSystemHealthColor(stats.cpuUsage, 'cpu')}`}>
                      {stats.cpuUsage > 80 ? 'عالي' : stats.cpuUsage > 60 ? 'متوسط' : 'منخفض'}
                    </span>
                    <span className="text-xs text-gray-500">استهلاك</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`bg-gradient-to-r h-2 rounded-full transition-all duration-500 ${
                      stats.cpuUsage > 80 ? 'from-red-500 to-red-600' : 
                      stats.cpuUsage > 60 ? 'from-yellow-500 to-yellow-600' : 
                      'from-green-500 to-green-600'
                    }`} style={{width: `${stats.cpuUsage}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced System Performance Bar */}
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 overflow-hidden`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">أداء النظام المباشر</h3>
                    <p className="text-xs text-gray-500">مراقبة مستمرة لأداء الخادم</p>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">مباشر</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* CPU Performance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">المعالج</span>
                    </div>
                    <span className={`text-sm font-bold ${getSystemHealthColor(stats.cpuUsage, 'cpu')}`}>
                      {stats.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                        stats.cpuUsage > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                        stats.cpuUsage > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`} style={{width: `${stats.cpuUsage}%`}}></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent to-white opacity-20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.cpuUsage > 80 ? '⚠️ استهلاك عالي' : stats.cpuUsage > 60 ? '⚡ استهلاك متوسط' : '✅ استهلاك طبيعي'}
                  </div>
                </div>

                {/* Memory Performance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <HardDrive className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">الذاكرة</span>
                    </div>
                    <span className={`text-sm font-bold ${getSystemHealthColor(stats.memoryUsage, 'memory')}`}>
                      {stats.memoryUsage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                        stats.memoryUsage > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                        stats.memoryUsage > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`} style={{width: `${stats.memoryUsage}%`}}></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent to-white opacity-20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.memoryUsage > 80 ? '⚠️ استهلاك عالي' : stats.memoryUsage > 60 ? '⚡ استهلاك متوسط' : '✅ استهلاك طبيعي'}
                  </div>
                </div>

                {/* Disk Performance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Database className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">القرص</span>
                    </div>
                    <span className={`text-sm font-bold ${getSystemHealthColor(stats.diskUsage, 'disk')}`}>
                      {stats.diskUsage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                        stats.diskUsage > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                        stats.diskUsage > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                        'bg-gradient-to-r from-orange-500 to-orange-600'
                      }`} style={{width: `${stats.diskUsage}%`}}></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent to-white opacity-20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.diskUsage > 80 ? '⚠️ مساحة منخفضة' : stats.diskUsage > 60 ? '⚡ مساحة كافية' : '✅ مساحة جيدة'}
                  </div>
                </div>

                {/* Network Performance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Wifi className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">النطاق</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      {stats.bandwidthUsage.toFixed(1)} GB/s
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: `${Math.min(100, (stats.bandwidthUsage / 10) * 100)}%`}}></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent to-white opacity-20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.bandwidthUsage > 8 ? '⚠️ ازدحام' : stats.bandwidthUsage > 5 ? '⚡ نشط' : '✅ طبيعي'}
                  </div>
                </div>
              </div>

              {/* Additional System Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">الاتصالات النشطة</div>
                  <div className="text-lg font-bold text-blue-600">{stats.activeConnections}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">معدل الاستجابة</div>
                  <div className="text-lg font-bold text-green-600">{stats.responseTime.toFixed(0)}ms</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">معدل الخطأ</div>
                  <div className="text-lg font-bold text-red-600">{stats.errorRate.toFixed(1)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">معدل التخزين المؤقت</div>
                  <div className="text-lg font-bold text-purple-600">{stats.cacheHitRate.toFixed(0)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Modern Tab Navigation */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-lg border p-2`}>
              <TabsList className={`grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2 h-auto p-0 bg-transparent`}>
                {/* Primary Tabs */}
                <TabsTrigger 
                  value="overview" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('overview')}
                  <span className="text-xs font-medium">نظرة عامة</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="users" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('users')}
                  <span className="text-xs font-medium">المستخدمون</span>
                </TabsTrigger>

                <TabsTrigger 
                  value="content" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('content')}
                  <span className="text-xs font-medium">المحتوى</span>
                </TabsTrigger>

                <TabsTrigger 
                  value="add-site" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('add-site')}
                  <span className="text-xs font-medium">إضافة موقع</span>
                </TabsTrigger>

                <TabsTrigger 
                  value="analytics" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('analytics')}
                  <span className="text-xs font-medium">التحليلات</span>
                </TabsTrigger>

                <TabsTrigger 
                  value="security" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('security')}
                  <span className="text-xs font-medium">الأمان</span>
                </TabsTrigger>

                {/* Secondary Tabs */}
                <TabsTrigger 
                  value="files" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('files')}
                  <span className="text-xs font-medium">الملفات</span>
                </TabsTrigger>

                <TabsTrigger 
                  value="email" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('email')}
                  <span className="text-xs font-medium">البريد</span>
                </TabsTrigger>

                <TabsTrigger 
                  value="settings" 
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-gray-800 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {getTabIcon('settings')}
                  <span className="text-xs font-medium">الإعدادات</span>
                </TabsTrigger>
              </TabsList>

              {/* Additional Tabs Dropdown */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <MoreHorizontal className="w-4 h-4 ml-2" />
                      المزيد من الخيارات
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-full">
                    <DropdownMenuItem onClick={() => setActiveTab('activity')}>
                      {getTabIcon('activity')}
                      <span className="mr-2">{getTabLabel('activity')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('performance')}>
                      {getTabIcon('performance')}
                      <span className="mr-2">{getTabLabel('performance')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('backup')}>
                      {getTabIcon('backup')}
                      <span className="mr-2">{getTabLabel('backup')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('api')}>
                      {getTabIcon('api')}
                      <span className="mr-2">{getTabLabel('api')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('maintenance')}>
                      {getTabIcon('maintenance')}
                      <span className="mr-2">{getTabLabel('maintenance')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('realtime')}>
                      {getTabIcon('realtime')}
                      <span className="mr-2">{getTabLabel('realtime')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('scheduler')}>
                      {getTabIcon('scheduler')}
                      <span className="mr-2">{getTabLabel('scheduler')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('roles')}>
                      {getTabIcon('roles')}
                      <span className="mr-2">{getTabLabel('roles')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Enhanced Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Recent Users Card */}
                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span>المستخدمون الجدد</span>
                      </CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        {users.length} إجمالي
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.slice(0, 5).map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {user.name.charAt(0)}
                              </div>
                              {index === 0 && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-left">
                            {getStatusBadge(user.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      عرض جميع المستخدمين
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity Card */}
                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span>النشاط الأخير</span>
                      </CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        مباشر
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemLogs.slice(0, 5).map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className={`w-3 h-3 rounded-full ${
                              log.status === 'success' ? 'bg-green-500' :
                              log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                            } animate-pulse`}></div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{log.action}</p>
                              <p className="text-sm text-gray-500">{log.user}</p>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-xs text-gray-500">
                              {new Date(log.timestamp).toLocaleTimeString('ar-SA')}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(log.timestamp).toLocaleDateString('ar-SA')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      عرض جميع الأنشطة
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats Card */}
                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-all duration-300 lg:col-span-2 xl:col-span-1`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>إحصائيات سريعة</span>
                      </CardTitle>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">مستخدمون</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">نشطون</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{stats.totalTemplates}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">قوالب</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{stats.totalMessages}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">رسائل</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">معدل النمو</span>
                          <span className="text-sm font-bold text-green-600">+{stats.monthlyGrowth}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">وقت التشغيل</span>
                          <span className="text-sm font-bold text-blue-600">{stats.serverUptime.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">معدل الاستجابة</span>
                          <span className="text-sm font-bold text-purple-600">{stats.responseTime.toFixed(0)}ms</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Overview */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    نظرة عامة على الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{stats.activeConnections}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">اتصال نشط</div>
                      <div className="text-xs text-green-600 mt-1">+12% من الأمس</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{stats.cacheHitRate.toFixed(0)}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">معدل التخزين المؤقت</div>
                      <div className="text-xs text-green-600 mt-1">أداء ممتاز</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">{stats.errorRate.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">معدل الخطأ</div>
                      <div className="text-xs text-green-600 mt-1">منخفض جداً</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AdvancedAnalytics />
            </TabsContent>

            {/* Roles Tab */}
            <TabsContent value="roles">
              <RoleManagement />
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>إدارة المستخدمين</CardTitle>
                    <div className="flex space-x-2 space-x-reverse">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="بحث عن مستخدم..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10"
                        />
                      </div>
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">الكل</SelectItem>
                          <SelectItem value="active">نشط</SelectItem>
                          <SelectItem value="inactive">غير نشط</SelectItem>
                          <SelectItem value="suspended">معلق</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>الدور</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>آخر تسجيل</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{new Date(user.lastLogin).toLocaleDateString('ar-SA')}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 ml-2" />
                                  عرض
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 ml-2" />
                                  تعديل
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="w-4 h-4 ml-2" />
                                  حذف
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <UserActivity />
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files">
              <FileManager />
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email">
              <EmailTemplate />
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              {/* Add Site Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">إدارة المحتوى</h2>
                <Button 
                  onClick={() => setShowAddSiteDialog(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة موقع جديد
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle>إدارة الأخبار</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {newsItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <p className="font-medium">{item.text}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString('ar-SA')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {getStatusBadge(item.priority)}
                            <Switch
                              checked={item.active}
                              onCheckedChange={() => {
                                setNewsItems(prev => 
                                  prev.map(n => n.id === item.id ? {...n, active: !n.active} : n)
                                );
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle>صور الخلفية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {backgroundImages.map((image) => (
                        <div key={image.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                              <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">{image.title}</p>
                              <p className="text-sm text-gray-500">الترتيب: {image.order}</p>
                            </div>
                          </div>
                          <Switch
                            checked={image.active}
                            onCheckedChange={() => {
                              setBackgroundImages(prev => 
                                prev.map(img => img.id === image.id ? {...img, active: !img.active} : img)
                              );
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">مواقع CIAR</CardTitle>
                    <p className="text-sm text-gray-500">
                      {ciarWebsites.length} موقعاً إجمالاً • {visibleWebsitesCount} ظاهر للزوار الآن
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchCiarWebsites}
                    className="self-start lg:self-auto"
                  >
                    <RefreshCw className="w-4 h-4 ml-2" />
                    تحديث القائمة
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ciarWebsites.length === 0 ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className="h-20 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {ciarWebsites.map(site => (
                        <div
                          key={site.id}
                          className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-lg">{site.title}</p>
                                <Badge variant="outline">{site.category}</Badge>
                                {site.hidden && (
                                  <Badge variant="destructive">مخفي</Badge>
                                )}
                                {site.featured && (
                                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                    مميز
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {site.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {site.badges?.map((badge) => (
                                  <Badge key={badge} variant="secondary" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                                {site.tags?.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-xs text-gray-500">
                                الرابط: <span className="underline">{site.url}</span>
                              </div>
                            </div>
                            <div className="w-full md:w-64 flex flex-col gap-3">
                              <div className="flex items-center justify-between text-sm">
                                <span>ظاهر للجمهور</span>
                                <Switch
                                  checked={!site.hidden}
                                  onCheckedChange={(value) => handleWebsiteVisibility(site.id, value)}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => openWebsiteEditor(site)}
                                >
                                  <Edit className="w-4 h-4 ml-2" />
                                  تعديل
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => window.open(`/websites/${site.id}`, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                  معاينة
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add New Site Tab */}
            <TabsContent value="add-site" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Add Templates */}
                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} lg:col-span-2`}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      إضافة موقع جديد
                    </CardTitle>
                    <Badge variant="outline">سريع</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* E-commerce Site */}
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">متجر إلكتروني</h3>
                            <p className="text-sm text-gray-500">تجارة إلكترونية كاملة</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>السعر:</span>
                            <span className="font-semibold text-green-600">₪599</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>الوقت:</span>
                            <span>2-3 أيام</span>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            اختيار
                          </Button>
                        </div>
                      </div>

                      {/* Portfolio Site */}
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Palette className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">معرض أعمال</h3>
                            <p className="text-sm text-gray-500">للمصممين والمبدعين</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>السعر:</span>
                            <span className="font-semibold text-green-600">₪399</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>الوقت:</span>
                            <span>1-2 يوم</span>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            اختيار
                          </Button>
                        </div>
                      </div>

                      {/* Restaurant Site */}
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">مطعم</h3>
                            <p className="text-sm text-gray-500">قوائم وحجوزات</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>السعر:</span>
                            <span className="font-semibold text-green-600">₪499</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>الوقت:</span>
                            <span>2-3 أيام</span>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            اختيار
                          </Button>
                        </div>
                      </div>

                      {/* Blog Site */}
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">مدونة</h3>
                            <p className="text-sm text-gray-500">محتوى ومقالات</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>السعر:</span>
                            <span className="font-semibold text-green-600">₪299</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>الوقت:</span>
                            <span>1 يوم</span>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            اختيار
                          </Button>
                        </div>
                      </div>

                      {/* Business Site */}
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">موقع أعمال</h3>
                            <p className="text-sm text-gray-500">شركة أو مؤسسة</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>السعر:</span>
                            <span className="font-semibold text-green-600">₪799</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>الوقت:</span>
                            <span>3-4 أيام</span>
                          </div>
                          <Button className="w-full mt-3" size="sm">
                            اختيار
                          </Button>
                        </div>
                      </div>

                      {/* Custom Site */}
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">مخصص</h3>
                            <p className="text-sm text-gray-500">حسب الطلب</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>السعر:</span>
                            <span className="font-semibold text-green-600">يبدأ من ₪999</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>الوقت:</span>
                            <span>5-7 أيام</span>
                          </div>
                          <Button className="w-full mt-3" variant="outline" size="sm">
                            استشارة مجانية
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-4">
                  {/* Recent Sites */}
                  <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">المواقع المضافة حديثاً</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                              <ShoppingBag className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">متجر الأزياء</p>
                              <p className="text-xs text-gray-500">منذ ساعتين</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">جديد</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                              <Palette className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">معرض الفن</p>
                              <p className="text-xs text-gray-500">منذ 5 ساعات</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">قيد التنفيذ</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                              <Users className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">مطعم السلام</p>
                              <p className="text-xs text-gray-500">منذ يوم</p>
                            </div>
                          </div>
                          <Badge variant="default" className="text-xs">مكتمل</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">المواقع هذا الشهر</span>
                          <span className="font-semibold">24</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">قيد التنفيذ</span>
                          <span className="font-semibold text-yellow-600">8</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">مكتملة</span>
                          <span className="font-semibold text-green-600">16</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">متوسط التكلفة</span>
                          <span className="font-semibold">₪549</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Help Card */}
                  <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-blue-200 bg-blue-50 dark:bg-blue-900/20`}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        تحتاج مساعدة؟
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        فريق الدعم متاح لمساعدتك في اختيار الموقع المناسب وتخصيصه حسب احتياجاتك.
                      </p>
                      <Button className="w-full" size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        تواصل مع الدعم
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Scheduler Tab */}
            <TabsContent value="scheduler">
              <ContentScheduler />
            </TabsContent>

            {/* API Keys Tab */}
            <TabsContent value="api-keys">
              <ApiKeys />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <SecurityAudit />
            </TabsContent>

            {/* Backup Tab */}
            <TabsContent value="backup">
              <BackupManager />
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance">
              <PerformanceMonitor />
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="maintenance">
              <MaintenanceMode />
            </TabsContent>

            {/* Real-time Monitor Tab */}
            <TabsContent value="realtime">
              <RealTimeMonitor />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <SystemSettings />
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isWebsiteDialogOpen} onOpenChange={setIsWebsiteDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الموقع</DialogTitle>
            </DialogHeader>
            {editingWebsite && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">عنوان الموقع</Label>
                    <Input
                      value={editingWebsite.title}
                      onChange={(e) => handleWebsiteFieldChange('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">الفئة</Label>
                    <Input
                      value={editingWebsite.category}
                      onChange={(e) => handleWebsiteFieldChange('category', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">الوصف</Label>
                  <Textarea
                    value={editingWebsite.description || ''}
                    onChange={(e) => handleWebsiteFieldChange('description', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">الرابط</Label>
                  <Input
                    value={editingWebsite.url}
                    onChange={(e) => handleWebsiteFieldChange('url', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">التقنيات (مفصولة بفاصلة)</Label>
                    <Textarea
                      value={(editingWebsite.technologies || []).join(', ')}
                      onChange={(e) =>
                        handleWebsiteFieldChange(
                          'technologies',
                          e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                        )
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">الشارات (مفصولة بفاصلة)</Label>
                    <Textarea
                      value={(editingWebsite.badges || []).join(', ')}
                      onChange={(e) =>
                        handleWebsiteFieldChange(
                          'badges',
                          e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                        )
                      }
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">الصور (رابط في كل سطر)</Label>
                  <Textarea
                    value={(editingWebsite.images || []).join('\n')}
                    onChange={(e) =>
                      handleWebsiteFieldChange(
                        'images',
                        e.target.value.split('\n').map(item => item.trim()).filter(Boolean)
                      )
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">الوسوم (مفصولة بفاصلة)</Label>
                  <Textarea
                    value={(editingWebsite.tags || []).join(', ')}
                    onChange={(e) =>
                      handleWebsiteFieldChange(
                        'tags',
                        e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                      )
                    }
                    rows={2}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">إظهار الموقع للجمهور</Label>
                  <Switch
                    checked={!editingWebsite.hidden}
                    onCheckedChange={(value) => handleWebsiteFieldChange('hidden', !value)}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsWebsiteDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={saveWebsiteChanges} disabled={websiteActionLoading}>
                    {websiteActionLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Notifications Panel */}
        <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <DialogContent className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} max-w-md`}>
            <DialogHeader>
              <DialogTitle>الإشعارات</DialogTitle>
            </DialogHeader>
            <NotificationsPanel 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </DialogContent>
        </Dialog>

        {/* Add Site Dialog */}
        <Dialog open={showAddSiteDialog} onOpenChange={setShowAddSiteDialog}>
          <DialogContent className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} max-w-4xl max-h-[90vh] overflow-y-auto`}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">إضافة موقع جديد</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="block text-sm font-medium mb-2">
                    عنوان الموقع *
                  </Label>
                  <Input
                    id="title"
                    value={newSite.title}
                    onChange={(e) => setNewSite(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان الموقع"
                    className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="block text-sm font-medium mb-2">
                    الفئة *
                  </Label>
                  <Select value={newSite.category} onValueChange={(value) => setNewSite(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">متجر إلكتروني</SelectItem>
                      <SelectItem value="portfolio">معرض أعمال</SelectItem>
                      <SelectItem value="blog">مدونة</SelectItem>
                      <SelectItem value="restaurant">مطعم</SelectItem>
                      <SelectItem value="business">موقع أعمال</SelectItem>
                      <SelectItem value="saas">برنامج كخدمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="block text-sm font-medium mb-2">
                  الوصف *
                </Label>
                <Textarea
                  id="description"
                  value={newSite.description}
                  onChange={(e) => setNewSite(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف الموقع"
                  rows={4}
                  className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                />
              </div>

              {/* Price and Provider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="block text-sm font-medium mb-2">
                    السعر *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newSite.price}
                    onChange={(e) => setNewSite(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="أدخل السعر"
                    className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                </div>
                
                <div>
                  <Label htmlFor="provider" className="block text-sm font-medium mb-2">
                    المزود
                  </Label>
                  <Input
                    id="provider"
                    value={newSite.provider}
                    onChange={(e) => setNewSite(prev => ({ ...prev, provider: e.target.value }))}
                    placeholder="أدخل اسم المزود"
                    className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                </div>
              </div>

              {/* Demo URL */}
              <div>
                <Label htmlFor="demoUrl" className="block text-sm font-medium mb-2">
                    رابط المعاينة
                  </Label>
                  <Input
                    id="demoUrl"
                    type="url"
                    value={newSite.demoUrl}
                    onChange={(e) => setNewSite(prev => ({ ...prev, demoUrl: e.target.value }))}
                    placeholder="https://example.com"
                    className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
              </div>

              {/* Images Upload */}
              <div>
                <Label className="block text-sm font-medium mb-2">
                  صور الموقع
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">
                      انقر لرفع الصور أو اسحب وأفلت
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 10MB
                    </p>
                  </label>
                </div>

                {/* Image Preview */}
                {newSite.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">الصور المرفوعة:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {newSite.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowAddSiteDialog(false)}
                  disabled={isUploading}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleAddSite}
                  disabled={isUploading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                      جاري الرفع...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة الموقع
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}