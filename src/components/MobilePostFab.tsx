import { useState } from 'react'
import { Fab, Dialog, Slide } from '@mui/material'
import { Plus, X } from 'lucide-react'
import { type TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'
import PostForm from './PostForm'

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  onPost: () => void
}

export default function MobilePostFab({ onPost }: Props) {
  const [open, setOpen] = useState(false)

  const handlePost = () => {
    onPost()
    setOpen(false)
  }

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #6366f1, #d946ef)',
          color: 'white',
          boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5, #c026d3)',
          },
        }}
      >
        <Plus size={24} />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={SlideUp}
        PaperProps={{
          sx: {
            borderRadius: '20px 20px 0 0',
            position: 'fixed',
            bottom: 0,
            m: 0,
            maxHeight: '85vh',
            width: '100%',
          },
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">新しい投稿</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          <PostForm onPost={handlePost} />
        </div>
      </Dialog>
    </>
  )
}
