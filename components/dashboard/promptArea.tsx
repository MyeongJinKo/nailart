"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type ClassValue = string | number | boolean | null | undefined;
const cn = (...inputs: ClassValue[]): string => inputs.filter(Boolean).join(" ");

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { showArrow?: boolean }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[260px] rounded-md bg-[#111] text-white px-2 py-1 text-xs shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-current" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-2xl bg-[#111] text-white p-3 shadow-xl outline-none animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/70 backdrop-blur-sm", className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[32px] bg-transparent p-0 shadow-none",
        className
      )}
      {...props}
    >
      <div className="relative rounded-[32px] bg-[#1d1d1d] p-6 shadow-2xl">{children}</div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M10 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M3 10l14-7-5 7 5 7-14-7z" fill="currentColor" />
  </svg>
);

const MicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M10 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 12v1a5 5 0 0010 0v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="17" x2="10" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const toolsList = [
  { id: "createImage", name: "Create image" },
  { id: "searchWeb", name: "Search web" },
  { id: "writeCode", name: "Write code" },
];

export const PromptArea = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = React.useState("");
  const [popOpen, setPopOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
  const hasValue = value.trim().length > 0 || Boolean(imagePreview);

  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
    }
  }, [value]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleSend = () => {
    if (!hasValue) return;
    setValue("");
    setImagePreview(null);
  };

  return (
    <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-gradient-to-br from-[#202020] to-[#141414] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Prompt</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">Creator Control</h2>
        </div>
        <Popover open={popOpen} onOpenChange={setPopOpen}>
          <PopoverTrigger asChild>
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/50">
              {selectedTool ? toolsList.find(t => t.id === selectedTool)?.name : "Tools"}
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom">
            <div className="flex flex-col gap-2">
              {toolsList.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setSelectedTool(tool.id);
                    setPopOpen(false);
                  }}
                  className="rounded-xl px-3 py-2 text-left text-sm hover:bg-white/5"
                >
                  {tool.name}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Describe the perfect thumbnail..."
          className="w-full resize-none border-0 bg-transparent text-lg text-white/90 placeholder:text-white/40 focus:outline-none"
          rows={4}
        />
      </div>

      {imagePreview && (
        <div className="mt-4 flex items-center justify-between rounded-3xl border border-white/15 bg-white/10 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-2xl object-cover" />
          <button onClick={() => setDialogOpen(true)} className="text-sm text-white/70 underline">
            View preview
          </button>
        </div>
      )}

      <div className="mt-5 flex items-center gap-3">
        <label className="flex rounded-full border border-white/20 px-3 py-2 text-sm text-white/70 transition hover:border-white/50 cursor-pointer">
          <PlusIcon className="mr-2" />
          Attach
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full border border-white/20 p-2 text-white transition hover:border-white/50">
                <MicIcon />
              </button>
            </TooltipTrigger>
            <TooltipContent showArrow>
              Record a quick voice prompt
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <button
          onClick={handleSend}
          disabled={!hasValue}
          className="ml-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb7c5] to-[#77b1ff] px-5 py-3 text-sm font-semibold text-black transition disabled:opacity-50"
        >
          Send
          <SendIcon />
        </button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button type="button" className="hidden" />
        </DialogTrigger>
        {imagePreview && (
          <DialogContent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Preview enlarged" className="w-full rounded-[24px] object-cover" />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
