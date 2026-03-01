"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Form, Input, Switch } from "antd";
import { Button as AntdButton } from "antd";

interface AnnouncementModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  initialData?: any;
  onSubmit: (values: any) => void;
}

export function AnnouncementModal({
  open,
  setOpen,
  initialData,
  onSubmit,
}: AnnouncementModalProps) {
  const [form] = Form.useForm();
  const isEditMode = !!initialData;

  // ------------------ TIPTAP ------------------
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md rounded-t-none border border-t-0 border-slate-200 bg-transparent px-3 py-2 text-sm focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      form.setFieldsValue({
        description: editor.getHTML(),
      });
    },
  });

  // ------------------ LOAD DATA ------------------
  useEffect(() => {
    if (open) {
      const data = {
        title: initialData?.title || "",
        description: initialData?.description || "",
        newAnnouncement:
          initialData?.newAnnouncement ?? true,
      };

      form.setFieldsValue(data);

      if (editor) {
        editor.commands.setContent(data.description);
      }
    }
  }, [open, initialData, editor, form]);

  // ------------------ SUBMIT ------------------
  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
    editor?.commands.clearContent();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px] max-h-[95vh] overflow-y-auto border-none shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode
              ? "Edit Announcement"
              : "Create Announcement"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the announcement details."
              : "Draft a new update for alumni."}
          </DialogDescription>
        </DialogHeader>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            newAnnouncement: true,
          }}
        >
          {/* Title */}
          <Form.Item
            name="title"
            label="Announcement Title"
            rules={[
              { required: true, message: "Please enter title" },
            ]}
          >
            <Input placeholder="e.g. Annual Alumni Meetup 2025" />
          </Form.Item>

          {/* Editor */}
          <div className="mb-4">
            <label className="font-medium block mb-2">
              Content
            </label>

            <div className="flex flex-col w-full">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-1 p-1 bg-slate-50 border border-slate-200 rounded-t-md">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${
                    editor?.isActive("bold")
                      ? "bg-slate-200"
                      : ""
                  }`}
                  onClick={() =>
                    editor?.chain().focus().toggleBold().run()
                  }
                >
                  <Bold size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${
                    editor?.isActive("italic")
                      ? "bg-slate-200"
                      : ""
                  }`}
                  onClick={() =>
                    editor?.chain().focus().toggleItalic().run()
                  }
                >
                  <Italic size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${
                    editor?.isActive("underline")
                      ? "bg-slate-200"
                      : ""
                  }`}
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <UnderlineIcon size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${
                    editor?.isActive("bulletList")
                      ? "bg-slate-200"
                      : ""
                  }`}
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .toggleBulletList()
                      .run()
                  }
                >
                  <List size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${
                    editor?.isActive("blockquote")
                      ? "bg-slate-200"
                      : ""
                  }`}
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .toggleBlockquote()
                      .run()
                  }
                >
                  <Quote size={16} />
                </Button>

                <div className="flex-grow" />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor?.chain().focus().undo().run()
                  }
                >
                  <Undo size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor?.chain().focus().redo().run()
                  }
                >
                  <Redo size={16} />
                </Button>
              </div>

              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Hidden description field */}
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Content is required",
              },
            ]}
            hidden
          >
            <Input type="hidden" />
          </Form.Item>

          {/* Switch */}
          <Form.Item
            name="newAnnouncement"
            label="Set as New"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <DialogFooter className="border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <AntdButton
              type="primary"
              htmlType="submit"
              className="bg-[#0b6ff0] hover:bg-[#0856ba] text-white"
            >
              {isEditMode
                ? "Save Changes"
                : "Create Announcement"}
            </AntdButton>
          </DialogFooter>
        </Form>
      </DialogContent>

      <style jsx global>{`
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #cbd5e1;
          padding-left: 1rem;
          font-style: italic;
        }
        .ProseMirror
          p.is-editor-empty:first-child::before {
          content: "Write announcement details...";
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </Dialog>
  );
}