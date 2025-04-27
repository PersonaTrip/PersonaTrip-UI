"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { WechatIcon, QqIcon } from "../components/social-icons"

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert("请同意用户协议和隐私政策")
      return
    }
    // 模拟注册逻辑
    console.log("注册信息:", { phoneNumber, verificationCode })
    router.push("/home")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">创建账号</h1>
        <p className="text-muted-foreground mt-2">加入旅途，开始您的旅行冒险</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
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
          <Label htmlFor="code">验证码</Label>
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

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            我已阅读并同意
            <Link href="/terms" className="text-primary hover:underline ml-1">
              用户协议
            </Link>
            和
            <Link href="/privacy" className="text-primary hover:underline ml-1">
              隐私政策
            </Link>
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={!agreedToTerms}>
          注册
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">社交账号注册</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
            <WechatIcon className="h-5 w-5" />
            <span className="sr-only">微信注册</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
            <QqIcon className="h-5 w-5" />
            <span className="sr-only">QQ注册</span>
          </Button>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          已有账号?{" "}
          <Link href="/login" className="text-primary hover:underline">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  )
}
