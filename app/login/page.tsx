"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { WechatIcon, QqIcon } from "../components/social-icons"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  const handleSendCode = () => {
    if (phoneNumber.length !== 11) {
      alert("请输入正确的手机号码")
      return
    }

    setIsSendingCode(true)
    setCountdown(60)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsSendingCode(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // 模拟发送验证码
    console.log("发送验证码到:", phoneNumber)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 模拟登录逻辑
    console.log("登录信息:", { phoneNumber, verificationCode })
    router.push("/home")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">旅途</h1>
        <p className="text-muted-foreground mt-2">探索世界的每一个角落</p>
      </div>

      <Tabs defaultValue="phone" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phone">手机号登录</TabsTrigger>
          <TabsTrigger value="password">密码登录</TabsTrigger>
        </TabsList>
        <TabsContent value="phone" className="mt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="code">验证码</Label>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="请输入验证码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendCode}
                  disabled={isSendingCode || phoneNumber.length !== 11}
                  className="whitespace-nowrap"
                >
                  {isSendingCode ? `${countdown}秒后重发` : "获取验证码"}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="password" className="mt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-password">手机号</Label>
              <Input id="phone-password" type="tel" placeholder="请输入手机号" required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">密码</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  忘记密码?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="请输入密码" required />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">社交账号登录</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
            <WechatIcon className="h-5 w-5" />
            <span className="sr-only">微信登录</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
            <QqIcon className="h-5 w-5" />
            <span className="sr-only">QQ登录</span>
          </Button>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          还没有账号?{" "}
          <Link href="/register" className="text-primary hover:underline">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  )
}
