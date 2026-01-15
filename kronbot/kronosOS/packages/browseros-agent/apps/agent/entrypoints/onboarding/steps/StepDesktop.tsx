import { Monitor, Wifi, Shield } from 'lucide-react'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type StepDirection, StepTransition } from './StepTransition'
import { useState } from 'react'
import { toast } from 'sonner'

interface StepDesktopProps {
  direction: StepDirection
}

export const StepDesktop: FC<StepDesktopProps> = ({ direction }) => {
  const [url, setUrl] = useState('http://localhost:9990/vnc')
  const [isTesting, setIsTesting] = useState(false)

  const testConnection = async () => {
    setIsTesting(true)
    try {
      // Simple fetch check
      await fetch(url, { mode: 'no-cors' })
      toast.success('Connection Successful', {
        description: 'Kronos Desktop is running and accessible.'
      })
    } catch (e) {
      toast.error('Connection Failed', {
        description: 'Ensure Kronos Desktop is running via ./launch_kronos.sh'
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <StepTransition direction={direction}>
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Desktop Integration
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            Connect to the Kronos Desktop environment for full system control.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 gap-3 py-6">
          <div className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-[var(--kronos-primary)]/50 hover:bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--kronos-primary)]/0 to-[var(--kronos-primary)]/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <Monitor className="mb-2 h-5 w-5 text-[var(--kronos-primary)]" />
            <h3 className="mb-1 font-semibold text-sm">Full Desktop Access</h3>
            <p className="text-muted-foreground text-xs">
              Control native apps and settings
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-[var(--kronos-primary)]/50 hover:bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--kronos-primary)]/0 to-[var(--kronos-primary)]/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <Shield className="mb-2 h-5 w-5 text-[var(--kronos-primary)]" />
            <h3 className="mb-1 font-semibold text-sm">Secure VNC</h3>
            <p className="text-muted-foreground text-xs">Local connection only</p>
          </div>
        </div>

        {/* Visual representation */}
        <div className="rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--kronos-primary)]">
                <Wifi className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-sm">Connection Settings</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono text-sm bg-background"
            />
            <Button 
              onClick={testConnection}
              disabled={isTesting}
              variant="outline"
              className="min-w-[100px]"
            >
              {isTesting ? 'Testing...' : 'Test'}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
             Default: http://localhost:9990/vnc
          </p>
        </div>
      </div>
    </StepTransition>
  )
}
