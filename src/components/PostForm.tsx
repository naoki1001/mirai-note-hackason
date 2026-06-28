import { useState } from 'react'
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from '@mui/material'
import { Send, Sparkles, Lock } from 'lucide-react'
import { useTime } from '../contexts/TimeContext'
import { addPost } from '../utils/storage'
import { CATEGORIES } from '../utils/sampleData'
import type { PostType, Category, Post } from '../types'

const TARGET_PRESETS = [
  { label: '1週間後', days: 7 },
  { label: '1ヶ月後', days: 30 },
  { label: '1年後', days: 365 },
  { label: '3年後', days: 1095 },
  { label: '10年後', days: 3650 },
  { label: '50年後', days: 18250 },
]

interface PostFormProps {
  onPost: () => void
}

export default function PostForm({ onPost }: PostFormProps) {
  const { now } = useTime()
  const [postType, setPostType] = useState<PostType>('prediction')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('自分の未来')
  const [targetPreset, setTargetPreset] = useState<number>(7)

  const handleSubmit = () => {
    if (!content.trim()) return

    const post: Post = {
      id: crypto.randomUUID(),
      type: postType,
      createdAt: now,
      targetDate: now + targetPreset * 86400000,
      category,
      content: content.trim(),
      reviewStatus: 'none',
    }

    addPost(post)
    setContent('')
    onPost()
  }

  return (
    <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg">
      <ToggleButtonGroup
        value={postType}
        exclusive
        onChange={(_, v) => v && setPostType(v)}
        fullWidth
        className="mb-4"
      >
        <ToggleButton value="prediction" className="!rounded-l-xl">
          <Sparkles size={18} className="mr-2" />
          未来予想
        </ToggleButton>
        <ToggleButton value="capsule" className="!rounded-r-xl">
          <Lock size={18} className="mr-2" />
          タイムカプセル
        </ToggleButton>
      </ToggleButtonGroup>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <FormControl size="small" fullWidth>
          <InputLabel>ターゲット日</InputLabel>
          <Select
            value={targetPreset}
            label="ターゲット日"
            onChange={(e: SelectChangeEvent<number>) => setTargetPreset(e.target.value as number)}
          >
            {TARGET_PRESETS.map((p) => (
              <MenuItem key={p.days} value={p.days}>
                {p.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel>カテゴリ</InputLabel>
          <Select
            value={category}
            label="カテゴリ"
            onChange={(e: SelectChangeEvent) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder={
          postType === 'prediction'
            ? '未来への予想や宣言を書こう...'
            : '未来の自分へのメッセージを書こう...'
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={!content.trim()}
        startIcon={<Send size={18} />}
        sx={{
          borderRadius: '12px',
          py: 1.5,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #c026d3)',
          },
        }}
      >
        投稿する
      </Button>
    </div>
  )
}
