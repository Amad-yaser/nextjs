'use client';

import { useState, useEffect } from 'react';
import { 
  Upload, 
  File, 
  Folder, 
  Download, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Edit,
  Copy,
  Move,
  Share2,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  HardDrive,
  Calendar,
  User,
  MoreHorizontal,
  Grid,
  List,
  Plus,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  mimeType: string;
  path: string;
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  shared: boolean;
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
}

interface UploadProgress {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/files?path=${encodeURIComponent(currentPath)}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    
    for (const file of uploadedFiles) {
      const uploadId = Math.random().toString(36).substr(2, 9);
      setUploadProgress(prev => [...prev, {
        id: uploadId,
        name: file.name,
        progress: 0,
        status: 'uploading'
      }]);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', currentPath);

      try {
        const response = await fetch('/api/admin/files/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          // Simulate progress
          for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(prev => 
              prev.map(item => 
                item.id === uploadId 
                  ? { ...item, progress: i, status: i === 100 ? 'completed' : 'uploading' }
                  : item
              )
            );
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } else {
          setUploadProgress(prev => 
            prev.map(item => 
              item.id === uploadId 
                ? { ...item, status: 'error' }
                : item
            )
          );
        }
      } catch (error) {
        setUploadProgress(prev => 
          prev.map(item => 
            item.id === uploadId 
              ? { ...item, status: 'error' }
              : item
          )
        );
      }
    }

    fetchFiles();
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/admin/files/${fileId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFiles(prev => prev.filter(file => file.id !== fileId));
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleDownloadFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/admin/files/${fileId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = files.find(f => f.id === fileId)?.name || '';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (mimeType.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <FileText className="w-4 h-4" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || file.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">مدير الملفات</h3>
          <p className="text-sm text-muted-foreground">إدارة وتنظيم الملفات والمجلدات</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </Button>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                رفع ملف
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>رفع ملفات جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      اختيار ملفات
                    </Button>
                  </label>
                </div>
                {uploadProgress.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">تقدم الرفع</h4>
                    {uploadProgress.map((upload) => (
                      <div key={upload.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{upload.name}</span>
                          <span>{upload.progress}%</span>
                        </div>
                        <Progress 
                          value={upload.progress} 
                          className={upload.status === 'error' ? 'bg-red-100' : ''}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPath('/')}>
          <HardDrive className="w-4 h-4 ml-1" />
          الرئيسية
        </Button>
        {currentPath.split('/').filter(Boolean).map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>/</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPath('/' + currentPath.split('/').filter(Boolean).slice(0, index + 1).join('/'))}
            >
              {segment}
            </Button>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="بحث عن ملفات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="نوع الملف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الملفات</SelectItem>
            <SelectItem value="file">ملفات</SelectItem>
            <SelectItem value="folder">مجلدات</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            تم تحديد {selectedFiles.length} ملف
          </span>
          <div className="flex gap-2 mr-auto">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-1" />
              تحميل
            </Button>
            <Button variant="outline" size="sm">
              <Move className="w-4 h-4 ml-1" />
              نقل
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4 ml-1" />
              نسخ
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 ml-1" />
              حذف
            </Button>
          </div>
        </div>
      )}

      {/* Files List */}
      <Card>
        <CardContent className="p-0">
          {viewMode === 'list' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الحجم</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>المالك</TableHead>
                  <TableHead>آخر تعديل</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={() => handleSelectFile(file.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {file.type === 'folder' ? (
                          <Folder className="w-4 h-4 text-blue-500" />
                        ) : (
                          getFileIcon(file.mimeType)
                        )}
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(file.size)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {file.type === 'folder' ? 'مجلد' : file.mimeType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {file.createdBy}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(file.modifiedAt).toLocaleDateString('ar-SA')}
                      </div>
                    </TableCell>
                    <TableCell>
                      {file.shared ? (
                        <Badge variant="secondary">مشترك</Badge>
                      ) : (
                        <Badge variant="outline">خاص</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleDownloadFile(file.id)}>
                            <Download className="w-4 h-4 ml-2" />
                            تحميل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 ml-2" />
                            معاينة
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 ml-2" />
                            مشاركة
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600"
                          >
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
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedFiles.includes(file.id) ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                  onClick={() => handleSelectFile(file.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    {file.type === 'folder' ? (
                      <Folder className="w-12 h-12 text-blue-500 mb-2" />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center mb-2">
                        {getFileIcon(file.mimeType)}
                      </div>
                    )}
                    <p className="text-sm font-medium truncate w-full">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}