"use client"

import { useState } from "react"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Bot } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

interface Message {
  id: string
  text: string
  time: string
  sender: "user" | "bot" | "contact"
}

const conversations: Conversation[] = [
  { id: "1", name: "Ana Silva", lastMessage: "Olha, gostei muito do produto!", time: "10:32", unread: 3, online: true },
  { id: "2", name: "Carlos Mendes", lastMessage: "Pode me enviar o catalogo?", time: "09:45", unread: 1, online: false },
  { id: "3", name: "Bruna Costa", lastMessage: "Obrigada pelo retorno!", time: "Ontem", unread: 0, online: true },
  { id: "4", name: "Diego Oliveira", lastMessage: "Qual o prazo de entrega?", time: "Ontem", unread: 0, online: false },
  { id: "5", name: "Fernanda Lima", lastMessage: "Vou pensar e retorno amanha.", time: "18/02", unread: 0, online: false },
  { id: "6", name: "Gabriel Santos", lastMessage: "Perfeito, pode agendar.", time: "17/02", unread: 0, online: true },
]

const messages: Message[] = [
  { id: "1", text: "Ola! Tudo bem? Vi o anuncio do novo produto.", time: "10:15", sender: "contact" },
  { id: "2", text: "Oi Ana! Tudo otimo, obrigado por entrar em contato. Posso te ajudar com mais informacoes sobre o produto.", time: "10:18", sender: "bot" },
  { id: "3", text: "Sim, por favor! Qual o valor e as condicoes de pagamento?", time: "10:22", sender: "contact" },
  { id: "4", text: "O valor a partir de R$ 299/mes com planos anuais. Aceitamos cartao, boleto e PIX. Quer que eu te envie uma proposta personalizada?", time: "10:25", sender: "bot" },
  { id: "5", text: "Olha, gostei muito do produto!", time: "10:32", sender: "contact" },
]

export default function ConversasPage() {
  const [selectedId, setSelectedId] = useState("1")
  const [search, setSearch] = useState("")
  const [messageInput, setMessageInput] = useState("")

  const selected = conversations.find((c) => c.id === selectedId)

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-border bg-card">
      {/* Sidebar */}
      <div className="flex w-80 flex-col border-r border-border">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar conversa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 rounded-xl pl-10 bg-secondary border-transparent text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                selectedId === conv.id && "bg-accent"
              )}
            >
              <div className="relative">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {conv.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate">{conv.name}</span>
                  <span className="text-[11px] text-muted-foreground ml-2 shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Chat header */}
        {selected && (
          <div className="flex items-center justify-between border-b border-border px-6 py-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {selected.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{selected.name}</p>
                <p className="text-xs text-primary">
                  {selected.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" className="rounded-lg">
                <Phone className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="rounded-lg">
                <Video className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="rounded-lg">
                <MoreVertical className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.sender === "contact" ? "justify-start" : "justify-end"
                )}
              >
                {msg.sender === "contact" && (
                  <Avatar className="size-7 mt-1">
                    <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                      AS
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2.5",
                    msg.sender === "contact"
                      ? "bg-secondary text-foreground rounded-tl-md"
                      : "bg-primary text-primary-foreground rounded-tr-md"
                  )}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Bot className="size-3 opacity-70" />
                      <span className="text-[10px] opacity-70 font-medium">Bot</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1",
                      msg.sender === "contact" ? "text-muted-foreground" : "opacity-70"
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
              <Paperclip className="size-5" />
            </Button>
            <Input
              placeholder="Digite sua mensagem..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="h-10 rounded-xl bg-secondary border-transparent"
            />
            <Button size="icon" className="rounded-xl shrink-0">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
