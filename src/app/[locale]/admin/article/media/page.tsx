"use client";

import { useCallback, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { QuickAccess } from "./QuickAccess";
import { FileManager } from "./FileManager";
import { SplitDropdownButton } from "@/components/button/SplitDropdownButton";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from '@mui/icons-material/Close';
import { Dropzone, DropzoneRefObject } from "@/components/form/Dropzone";

import { FormFolder } from "./FormFolder";
import { FormFile } from "./FormFile";
import { FormCreateFolder } from "./FormCreateFolder";

interface Form {
  uploadFile: boolean;
  createFolder: boolean;
  uploadFolder: boolean;
};

const initialForm: Form = {
  uploadFile: false,
  createFolder: false,
  uploadFolder: false,
};



export default function ArticleMedia() {
  const [form, setForm] = useState<Form>(initialForm);
  const dropzoneRef = useRef<DropzoneRefObject>(null);
  const total = 1024;
  const storages = [
    {
      title: "Local Storage",
      used: 256,
      icon: <StorageOutlinedIcon color="primary" />,
    },
    {
      title: "Cloud Storage",
      used: 640,
      icon: <FilterDramaOutlinedIcon color="primary" />,
    },
  ];

  const sendFiles = () => {
    if (dropzoneRef && dropzoneRef.current) {
      console.log(dropzoneRef.current.getFiles())
    }
  };

  const con = useCallback(() => {
    try {
      console.log("Connect")
      const ws = new WebSocket("ws://localhost:3000/api");

      ws.onopen = () => {
        ws.send("Hello Server");
      };

      ws.onmessage = (event) => {
        console.log(event.data);
      };

      ws.onerror = (err) => console.log(err)
      ws.onclose = (err) => console.log(err)
    } catch (error) {
      console.error(error)
    }
  }, []);

  const load = useCallback(() => {

  }, []);
  

  return (
    <Box sx={{ p: 3 }}>

      <FormCreateFolder
        open={form.createFolder}
        onClose={() => {
          setForm(pre => ({ ...pre, createFolder: false }))
        }}
      />
      <FormFolder
        open={form.uploadFolder}
        onClose={() => {
          setForm(pre => ({ ...pre, uploadFolder: false }))
        }}
      />
      <FormFile
        open={form.uploadFile}
        onClose={() => {
          setForm(pre => ({ ...pre, uploadFile: false }))
        }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
          >
            <Breadcrumbs sx={{ mb: 3 }}>
              <Link underline="hover" color="inherit">
                <Home fontSize="small" />
              </Link>
              <Link underline="hover" color="inherit">
                File Manager
              </Link>
              <Typography color="text.primary">Files</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"end"}
            gap={2}
          >
            <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>Import</Button>
            <Button variant="outlined" startIcon={<FileUploadOutlinedIcon />} color="success">Export</Button>
            <SplitDropdownButton>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CloudUploadOutlinedIcon />}
                onClick={() => setForm(pre => ({ ...pre, uploadFile: !pre.uploadFile }))}
              >
                Upload File
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DriveFolderUploadIcon />}
                onClick={() => setForm(pre => ({ ...pre, uploadFolder: true }))}
              >
                Upload Folder
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CreateNewFolderIcon />}
                onClick={() => setForm(pre => ({ ...pre, createFolder: true }))}
              >
                Create Folder
              </Button>
            </SplitDropdownButton>
          </Box>
        </Grid>
      </Grid>

      {/* CARD Storage */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {storages.map((item) => {
          const free = total - item.used;
          const percent = Math.round((item.used / total) * 100);

          const chartData = [
            { name: "Used", value: item.used, fill: "#0d0de0" },
            { name: "Free", value: free, fill: "rgba(0,0,0,0.12)" },
          ];

          return (
            <Grid key={item.title} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <Card sx={{ p: 3, borderRadius: 4 }}>

                {/* Header */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(13,13,224,0.1)",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box>
                    <Typography fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography fontSize="0.85rem" color="text.secondary">
                      {item.used} GB / {total} GB
                    </Typography>
                  </Box>
                </Box>

                {/* Content */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {percent}%
                    </Typography>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Used
                    </Typography>
                  </Box>

                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        innerRadius={42}
                        outerRadius={55}
                        startAngle={90}
                        endAngle={-270}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="18"
                        fontWeight="600"
                        fill="#555"
                      >
                        {percent}%
                      </text>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <QuickAccess />
      <Divider sx={{ my: 3 }} />
      <FileManager />


    </Box>
  );
};