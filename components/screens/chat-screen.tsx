"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Pin,
  PinOff,
  Save,
  X,
  MessageSquare,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  isEditing?: boolean
}

interface Dialogue {
  id: string
  name: string
  messages: Message[]
  isPinned: boolean
  lastActivity: Date
}

const quickActions = [
  "What should I eat for breakfast? 🥗",
  "Calculate my daily calories 📊",
  "Suggest a healthy snack 🍎",
  "Plan my weekly meals 📅",
]

export default function ChatScreen() {
  const [dialogues, setDialogues] = useState<Dialogue[]>([
    {
      id: "1",
      name: "Nutrition Chat",
      messages: [
        {
          id: "1",
          type: "bot",
          content:
            "Hello! I'm your AI nutrition coach! 💪 I can help you with meal planning, calorie counting, and nutrition advice. Ready to crush your fitness goals together? How can I assist you today?",
          timestamp: new Date(),
        },
      ],
      isPinned: false,
      lastActivity: new Date(),
    },
  ])

  const [activeDialogueId, setActiveDialogueId] = useState<string>("1")
  const [showDialogueList, setShowDialogueList] = useState(false)
  const [showDialogueMenu, setShowDialogueMenu] = useState<string | null>(null)
  const [editingDialogueName, setEditingDialogueName] = useState<string | null>(null)
  const [newDialogueName, setNewDialogueName] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editedMessageContent, setEditedMessageContent] = useState("")

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeDialogue = dialogues.find((d) => d.id === activeDialogueId)
  const [showWelcomeCard, setShowWelcomeCard] = useState(activeDialogue ? activeDialogue.messages.length <= 1 : true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeDialogue?.messages])

  const createNewDialogue = () => {
    const newDialogue: Dialogue = {
      id: Date.now().toString(),
      name: `Chat ${dialogues.length + 1}`,
      messages: [
        {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Hello! I'm your AI nutrition coach! 💪 I can help you with meal planning, calorie counting, and nutrition advice. Ready to crush your fitness goals together? How can I assist you today?",
          timestamp: new Date(),
        },
      ],
      isPinned: false,
      lastActivity: new Date(),
    }

    setDialogues((prev) => [newDialogue, ...prev])
    setActiveDialogueId(newDialogue.id)
    setShowDialogueList(false)
  }

  const deleteDialogue = (dialogueId: string) => {
    if (dialogues.length <= 1) return // Keep at least one dialogue

    setDialogues((prev) => prev.filter((d) => d.id !== dialogueId))

    if (activeDialogueId === dialogueId) {
      const remainingDialogues = dialogues.filter((d) => d.id !== dialogueId)
      setActiveDialogueId(remainingDialogues[0]?.id || "")
    }

    setDeleteConfirmId(null)
    setShowDialogueMenu(null)
  }

  const renameDialogue = (dialogueId: string, newName: string) => {
    setDialogues((prev) => prev.map((d) => (d.id === dialogueId ? { ...d, name: newName.trim() || d.name } : d)))
    setEditingDialogueName(null)
    setNewDialogueName("")
    setShowDialogueMenu(null)
  }

  const togglePinDialogue = (dialogueId: string) => {
    setDialogues((prev) => prev.map((d) => (d.id === dialogueId ? { ...d, isPinned: !d.isPinned } : d)))
    setShowDialogueMenu(null)
  }

  const startEditingMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId)
    setEditedMessageContent(content)
  }

  const saveEditedMessage = () => {
    if (!activeDialogue || !editingMessageId) return

    const editedContent = editedMessageContent.trim() || ""

    // Update the existing message
    setDialogues((prev) =>
      prev.map((d) =>
        d.id === activeDialogueId
          ? {
              ...d,
              messages: d.messages.map((m) => (m && m.id === editingMessageId ? { ...m, content: editedContent } : m)),
            }
          : d,
      ),
    )

    // Generate new AI response without creating a new user message
    generateAIResponse(editedContent)

    setEditingMessageId(null)
    setEditedMessageContent("")
  }

  const generateAIResponse = async (content: string) => {
    if (!content.trim() || !activeDialogue) return

    setIsLoading(true)
    setIsTyping(true)

    // Find and remove the previous bot response if it exists
    const editedMessageIndex = activeDialogue.messages.findIndex((m) => m.id === editingMessageId)
    if (editedMessageIndex !== -1 && editedMessageIndex < activeDialogue.messages.length - 1) {
      const nextMessage = activeDialogue.messages[editedMessageIndex + 1]
      if (nextMessage && nextMessage.type === "bot") {
        // Remove the old bot response
        setDialogues((prev) =>
          prev.map((d) =>
            d.id === activeDialogueId
              ? {
                  ...d,
                  messages: d.messages.filter((m) => m.id !== nextMessage.id),
                }
              : d,
          ),
        )
      }
    }
  }

  const cancelEditingMessage = () => {
    setEditingMessageId(null)
    setEditedMessageContent("")
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || !activeDialogue) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setShowWelcomeCard(false)

    setDialogues((prev) =>
      prev.map((d) =>
        d.id === activeDialogueId
          ? {
              ...d,
              messages: [...d.messages, userMessage],
              lastActivity: new Date(),
            }
          : d,
      ),
    )

    setInputValue("")
    setIsLoading(true)
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `Great question! "${content}" 🎯 This is a demo response. In a real app, I'd provide personalized nutrition advice based on your fitness goals, dietary preferences, and current progress. Let's get you stronger and healthier! 💪`,
        timestamp: new Date(),
      }

      setDialogues((prev) =>
        prev.map((d) =>
          d.id === activeDialogueId
            ? {
                ...d,
                messages: [...d.messages, botMessage],
                lastActivity: new Date(),
              }
            : d,
        ),
      )
      setIsLoading(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickAction = (action: string) => {
    sendMessage(action)
  }

  const sortedDialogues = [...dialogues].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return b.lastActivity.getTime() - a.lastActivity.getTime()
  })

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-surface via-surface to-secondary-container/5">
      {/* Header with Chat Management */}
      <div className="bg-gradient-fitness-primary p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowDialogueList(!showDialogueList)}
              className="p-2 hover:bg-on-primary/10 rounded-full transition-all duration-200"
            >
              <MessageSquare className="w-6 h-6 text-on-primary" />
            </button>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-on-primary to-tertiary-container rounded-full flex items-center justify-center shadow-xl">
                <Bot className="w-7 h-7 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-2 h-2 text-on-tertiary" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-on-primary truncate max-w-[150px]">
                {activeDialogue?.name || "AI Nutrition Coach"}
              </h1>
              <p className="text-xs text-on-primary/80 font-medium">
                {isTyping ? "Analyzing nutrition... 🧠" : "Your fitness companion"}
              </p>
            </div>
          </div>

          <button
            onClick={createNewDialogue}
            className="p-2 hover:bg-on-primary/10 rounded-full transition-all duration-200"
          >
            <Plus className="w-6 h-6 text-on-primary" />
          </button>
        </div>
      </div>

      {/* Dialogue List Overlay */}
      {showDialogueList && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex">
          <div className="w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gray-50 sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Chats 💬</h2>
                <button
                  onClick={() => setShowDialogueList(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {sortedDialogues.map((dialogue) => (
                <div
                  key={dialogue.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 hover:shadow-md cursor-pointer ${
                    dialogue.id === activeDialogueId
                      ? "bg-blue-50 border-blue-200 shadow-md"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveDialogueId(dialogue.id)
                    setShowDialogueList(false)
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {dialogue.isPinned && <Pin className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                        <h3 className="font-semibold text-gray-900 truncate">{dialogue.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {dialogue.messages.length} messages • {dialogue.lastActivity.toLocaleDateString()}
                      </p>
                    </div>

                    <div className="relative ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDialogueMenu(showDialogueMenu === dialogue.id ? null : dialogue.id)
                        }}
                        className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>

                      {showDialogueMenu === dialogue.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-10 min-w-[160px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingDialogueName(dialogue.id)
                              setNewDialogueName(dialogue.name)
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-t-2xl flex items-center space-x-2 text-sm text-gray-700"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Rename</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              togglePinDialogue(dialogue.id)
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2 text-sm text-gray-700"
                          >
                            {dialogue.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                            <span>{dialogue.isPinned ? "Unpin" : "Pin"}</span>
                          </button>
                          {dialogues.length > 1 && (
                            <button
  onClick={(e) => {
    e.stopPropagation()
    // Аномальная функция: например, удаляет только если имя диалога содержит "test"
    if (dialogue.name && dialogue.name.toLowerCase().includes("test")) {
      alert(`Диалог "${dialogue.name}" будет удалён!`)
      handleDeleteDialogue(dialogue.id)
    } else {
      alert('Удаление разрешено только для диалогов с "test" в имени!')
    }
  }}
  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
>
  <Trash2 className="w-4 h-4 mr-2" />
  <span>Delete</span>
</button>

                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowDialogueList(false)} />
        </div>
      )}

      {/* Rename Dialogue Modal */}
      {editingDialogueName && (
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container rounded-3xl p-6 w-full max-w-sm border border-outline-variant shadow-xl opacity-100 border-white bg-white">
            <h3 className="text-lg font-bold text-on-surface mb-4">Rename Chat</h3>
            <input
              type="text"
              value={newDialogueName}
              onChange={(e) => setNewDialogueName(e.target.value)}
              className="w-full bg-surface-variant text-on-surface rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant mb-4"
              placeholder="Enter new name..."
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={() => renameDialogue(editingDialogueName, newDialogueName)}
                className="flex-1 text-on-primary py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-all duration-200 bg-green-400"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingDialogueName(null)
                  setNewDialogueName("")
                }}
                className="flex-1 bg-surface-variant text-on-surface py-3 rounded-2xl font-semibold hover:bg-surface-variant/80 transition-all duration-200 bg-slate-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container rounded-3xl p-6 w-full max-w-sm shadow-xl border border-outline-variant">
            <h3 className="text-lg font-bold text-on-surface mb-2">Delete Chat?</h3>
            <p className="text-on-surface-variant mb-6">
              This action cannot be undone. All messages in this chat will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 bg-surface-variant text-on-surface py-3 rounded-2xl font-semibold hover:bg-surface-variant/80 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteDialogue(deleteConfirmId)}
                className="flex-1 bg-error text-on-error py-3 rounded-2xl font-semibold hover:bg-error/90 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact Welcome Card - Bottom positioned */}
      {showWelcomeCard && (
        <div className="p-4 border-b border-outline-variant bg-surface-container/90 backdrop-blur-md">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Quick start 🚀</span>
              </div>
              <button
                onClick={() => setShowWelcomeCard(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {quickActions.slice(0, 3).map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleQuickAction(action)
                    setShowWelcomeCard(false)
                  }}
                  className="text-left p-3 bg-gray-100/80 rounded-xl text-xs text-gray-700 hover:bg-gray-200/80 transition-all duration-200 font-medium border border-gray-200/50"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        {activeDialogue?.messages?.filter(Boolean).map(
          (message, index) =>
            message && (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex items-end space-x-3 max-w-[85%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      message.type === "user"
                        ? "bg-gradient-fitness-primary"
                        : "bg-gradient-to-br from-secondary-container to-tertiary-container"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-6 h-6 text-on-primary" />
                    ) : (
                      <Bot className="w-6 h-6 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`rounded-3xl p-5 shadow-lg border transition-all duration-200 hover:shadow-xl ${
                        message.type === "user"
                          ? "bg-gradient-fitness-primary text-on-primary border-primary/20 rounded-br-lg"
                          : "bg-surface-container text-on-surface border-outline-variant rounded-bl-lg"
                      }`}
                    >
                      {editingMessageId === message.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editedMessageContent}
                            onChange={(e) => setEditedMessageContent(e.target.value)}
                            className="w-full bg-surface-variant text-on-surface rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant resize-none"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditedMessage}
                              className="p-2 bg-success text-on-success rounded-full hover:bg-success/90 transition-all duration-200"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEditingMessage}
                              className="p-2 bg-error text-on-error rounded-full hover:bg-error/90 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                          <div className="flex items-center justify-between mt-3">
                            <p
                              className={`text-xs font-medium ${
                                message.type === "user" ? "text-on-primary/70" : "text-on-surface-variant"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                            {message.type === "user" && (
                              <button
                                onClick={() => startEditingMessage(message.id, message.content)}
                                className={`opacity-0 group-hover:opacity-100 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                                  message.type === "user"
                                    ? "hover:bg-on-primary/10 text-on-primary/70"
                                    : "hover:bg-surface-variant text-on-surface-variant"
                                }`}
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-end space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-container to-tertiary-container rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-secondary" />
              </div>
              <div className="bg-surface-container rounded-3xl rounded-bl-lg p-5 shadow-lg border border-outline-variant">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-tertiary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-sm text-on-surface-variant font-medium">AI is thinking... 🧠</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-outline-variant bg-surface-container/80 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about nutrition and fitness... 💪"
              className="w-full bg-surface-variant text-on-surface placeholder-on-surface-variant rounded-3xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant transition-all duration-200 hover:bg-surface-variant/80 font-medium"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-fitness-primary text-on-primary p-4 rounded-full hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl animate-pulse-glow"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
          </button>
        </form>
      </div>
    </div>
  )
}
