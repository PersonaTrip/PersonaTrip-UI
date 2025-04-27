"use client"

import { useState } from "react"
import { Calendar, MapPin, User, Compass, MessageCircle, Search, ChevronRight, ImageIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex flex-col h-screen">
      {/* 主内容区域 */}
      <main className="flex-1 overflow-auto pb-16">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "itinerary" && <ItineraryTab />}
        {activeTab === "guide" && <GuideTab />}
        {activeTab === "friends" && <FriendsTab />}
        {activeTab === "user" && <UserTab />}
      </main>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around px-2 shadow-lg">
        <Button
          variant="ghost"
          className={`nav-button flex flex-col items-center justify-center h-14 w-16 rounded-lg ${
            activeTab === "home" ? "active" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <Compass className="h-5 w-5" />
          <span className="text-xs mt-1">首页</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-button flex flex-col items-center justify-center h-14 w-16 rounded-lg ${
            activeTab === "itinerary" ? "active" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("itinerary")}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">行程</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-button flex flex-col items-center justify-center h-14 w-16 rounded-lg ${
            activeTab === "guide" ? "active" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("guide")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-xs mt-1">AI助手</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-button flex flex-col items-center justify-center h-14 w-16 rounded-lg ${
            activeTab === "friends" ? "active" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("friends")}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">朋友</span>
        </Button>
        <Button
          variant="ghost"
          className={`nav-button flex flex-col items-center justify-center h-14 w-16 rounded-lg ${
            activeTab === "user" ? "active" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("user")}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">用户</span>
        </Button>
      </nav>
    </div>
  )
}

function HomeTab() {
  return (
    <div className="space-y-6 p-4">
      <div className="header-gradient -mx-4 -mt-4 px-4 py-6 rounded-b-3xl shadow-md mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">探索旅途</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* 搜索框 */}
        <div className="relative mt-4">
          <Input
            type="text"
            placeholder="搜索目的地、景点、攻略..."
            className="pl-10 pr-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* 热门目的地 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">热门目的地</h2>
          <Button variant="ghost" size="sm" className="text-sm text-travel-blue">
            查看全部
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <DestinationCard
            name="北京"
            image="/placeholder.svg?height=150&width=150"
            description="探索古都文化"
            type="beijing"
          />
          <DestinationCard
            name="上海"
            image="/placeholder.svg?height=150&width=150"
            description="感受现代魅力"
            type="shanghai"
          />
          <DestinationCard
            name="成都"
            image="/placeholder.svg?height=150&width=150"
            description="品味休闲生活"
            type="chengdu"
          />
          <DestinationCard
            name="三亚"
            image="/placeholder.svg?height=150&width=150"
            description="享受阳光海滩"
            type="sanya"
          />
        </div>
      </div>

      {/* 精选攻略 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">精选攻略</h2>
          <Button variant="ghost" size="sm" className="text-sm text-travel-blue">
            查看全部
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex space-x-3">
            <GuideCard
              title="北京三日游完美攻略"
              image="/placeholder.svg?height=120&width=200"
              author="旅行达人"
              views={1234}
              color="blue"
            />
            <GuideCard
              title="上海必去景点TOP10"
              image="/placeholder.svg?height=120&width=200"
              author="城市探索者"
              views={987}
              color="purple"
            />
            <GuideCard
              title="成都美食地图"
              image="/placeholder.svg?height=120&width=200"
              author="吃货指南"
              views={2345}
              color="green"
            />
            <GuideCard
              title="三亚海滩度假全攻略"
              image="/placeholder.svg?height=120&width=200"
              author="阳光沙滩"
              views={876}
              color="orange"
            />
          </div>
        </ScrollArea>
      </div>

      {/* 旅行灵感 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">旅行灵感</h2>
          <Button variant="ghost" size="sm" className="text-sm text-travel-blue">
            更多灵感
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          <InspirationCard
            title="周末小旅行"
            description="发现周边好去处，轻松规划周末时光"
            image="/placeholder.svg?height=100&width=320"
            color="blue"
          />
          <InspirationCard
            title="亲子游推荐"
            description="适合全家出游的目的地和活动"
            image="/placeholder.svg?height=100&width=320"
            color="green"
          />
          <InspirationCard
            title="摄影胜地"
            description="捕捉最美风景，留下难忘回忆"
            image="/placeholder.svg?height=100&width=320"
            color="purple"
          />
        </div>
      </div>
    </div>
  )
}

function ItineraryTab() {
  const [showTripPlanner, setShowTripPlanner] = useState(false)

  return (
    <div className="p-4 space-y-6">
      <div className="header-gradient -mx-4 -mt-4 px-4 py-6 rounded-b-3xl shadow-md mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">我的行程</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTripPlanner(true)}
              className="bg-white/80 backdrop-blur-sm border-0 hover:bg-white"
            >
              生成攻略
            </Button>
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
              创建行程
            </Button>
          </div>
        </div>
      </div>

      {showTripPlanner && (
        <Card className="mb-4 border border-travel-blue/20 shadow-md overflow-hidden">
          <div className="bg-gradient-travel h-2"></div>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-travel-blue">生成旅行攻略</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowTripPlanner(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">目的地</p>
              <Input placeholder="您想去哪里？例如：北京、上海、成都..." />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">出行时间</p>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" placeholder="开始日期" />
                <Input type="date" placeholder="结束日期" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">出行人数</p>
              <Input type="number" placeholder="几位旅客？" min="1" defaultValue="1" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">旅行偏好（可多选）</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="badge-food cursor-pointer">
                  美食
                </Badge>
                <Badge variant="outline" className="badge-culture cursor-pointer">
                  文化
                </Badge>
                <Badge variant="outline" className="badge-nature cursor-pointer">
                  自然风光
                </Badge>
                <Badge variant="outline" className="badge-shopping cursor-pointer">
                  购物
                </Badge>
                <Badge variant="outline" className="badge-culture cursor-pointer">
                  历史
                </Badge>
                <Badge variant="outline" className="badge-relax cursor-pointer">
                  休闲
                </Badge>
                <Badge variant="outline" className="badge-adventure cursor-pointer">
                  冒险
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">特殊需求（可选）</p>
              <Input placeholder="有什么特别的要求？例如：带小孩、老人同行..." />
            </div>

            <Button className="w-full bg-gradient-travel hover:opacity-90">生成旅行攻略</Button>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">即将出发</TabsTrigger>
          <TabsTrigger value="ongoing">进行中</TabsTrigger>
          <TabsTrigger value="past">已完成</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4 space-y-4">
          <ItineraryCard
            title="北京三日游"
            date="2023年10月1日 - 2023年10月3日"
            status="upcoming"
            places={["故宫", "长城", "颐和园"]}
          />
          <ItineraryCard
            title="上海周末游"
            date="2023年10月15日 - 2023年10月16日"
            status="upcoming"
            places={["外滩", "迪士尼", "田子坊"]}
          />
          <div className="text-center py-4 text-muted-foreground">没有更多行程了</div>
        </TabsContent>
        <TabsContent value="ongoing" className="mt-4 space-y-4">
          <div className="text-center py-8 text-muted-foreground">暂无进行中的行程</div>
        </TabsContent>
        <TabsContent value="past" className="mt-4 space-y-4">
          <ItineraryCard
            title="成都美食之旅"
            date="2023年9月10日 - 2023年9月12日"
            status="completed"
            places={["宽窄巷子", "锦里", "春熙路"]}
          />
          <ItineraryCard
            title="三亚度假"
            date="2023年8月1日 - 2023年8月5日"
            status="completed"
            places={["亚龙湾", "天涯海角", "南山寺"]}
          />
          <div className="text-center py-4 text-muted-foreground">没有更多行程了</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GuideTab() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "你好！我是你的AI旅行助手。有什么可以帮到你的吗？无论是旅行建议、景点推荐还是行程规划，都可以问我哦！",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // 添加用户消息
    setMessages([...messages, { role: "user", content: inputMessage }])

    // 模拟AI回复
    setTimeout(() => {
      const aiResponses = [
        "这个地方很不错！我推荐你可以在那里待2-3天，一定要去尝尝当地的特色美食。",
        "根据你的偏好，我建议你可以考虑这几个景点：故宫、长城、颐和园。每个地方都有其独特的历史和文化价值。",
        "对于带小孩的家庭旅行，我推荐选择一些互动性强的景点，比如主题公园或者科技馆。",
        "如果你喜欢自然风光，那么九寨沟、张家界和黄山都是不错的选择。最佳旅行季节是春秋两季。",
        "对于预算有限的旅行，可以考虑选择青旅住宿，使用公共交通，并寻找当地人推荐的平价美食。",
      ]
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
    }, 1000)

    // 清空输入框
    setInputMessage("")
  }

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-80px)]">
      <div className="header-gradient -mx-4 -mt-4 px-4 py-6 rounded-b-3xl shadow-md mb-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">AI旅行助手</h1>
          <p className="text-white/80 text-sm">随时为您提供旅行建议和帮助</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user" ? "message-user" : "message-assistant"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="输入您的问题..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="border-travel-blue/30 focus-visible:ring-travel-blue/30"
        />
        <Button onClick={handleSendMessage} className="bg-travel-blue hover:bg-travel-blue/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </Button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">你可以问我：</p>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="badge-travel cursor-pointer"
            onClick={() => setInputMessage("推荐北京的必去景点")}
          >
            推荐北京的必去景点
          </Badge>
          <Badge
            variant="outline"
            className="badge-nature cursor-pointer"
            onClick={() => setInputMessage("适合带孩子的旅游地点")}
          >
            适合带孩子的旅游地点
          </Badge>
          <Badge
            variant="outline"
            className="badge-relax cursor-pointer"
            onClick={() => setInputMessage("三亚三日游行程规划")}
          >
            三亚三日游行程规划
          </Badge>
        </div>
      </div>
    </div>
  )
}

function FriendsTab() {
  const [showMoments, setShowMoments] = useState(false)

  return (
    <div className="p-4 space-y-6">
      {!showMoments ? (
        <>
          <div className="header-gradient -mx-4 -mt-4 px-4 py-6 rounded-b-3xl shadow-md mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">朋友</h1>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMoments(true)}
                  className="bg-white/80 backdrop-blur-sm border-0 hover:bg-white"
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  朋友圈
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="搜索朋友..."
              className="pl-10 pr-4 py-2 border-travel-blue/20 focus-visible:ring-travel-blue/30"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="space-y-1">
            <ChatItem
              name="旅行达人"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="北京的故宫真的太美了，你什么时候有空一起去？"
              time="10:30"
              unread={2}
            />
            <ChatItem
              name="美食猎人"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="我发现了一家超级好吃的餐厅，下次带你去！"
              time="昨天"
              unread={0}
            />
            <ChatItem
              name="背包客"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="三亚的照片我已经整理好了，一会发给你"
              time="周一"
              unread={0}
            />
            <ChatItem
              name="摄影师小王"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="这个角度拍出来的照片效果真不错！"
              time="周日"
              unread={0}
            />
            <ChatItem
              name="登山爱好者"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="下周末我们去爬山吧，天气预报说是晴天"
              time="上周"
              unread={0}
            />
            <ChatItem
              name="自驾游群"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="[张三]: 大家国庆有什么自驾计划吗？"
              time="上周"
              unread={5}
              isGroup={true}
            />
            <ChatItem
              name="旅行规划师"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="您的行程已经规划好了，请查收"
              time="9月10日"
              unread={0}
            />
            <ChatItem
              name="酒店预订助手"
              avatar="/placeholder.svg?height=40&width=40"
              lastMessage="您预订的酒店已确认，感谢您的使用"
              time="9月5日"
              unread={0}
            />
          </div>

          <Button className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-travel-blue hover:bg-travel-blue/90 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </>
      ) : (
        <>
          <div className="header-gradient -mx-4 -mt-4 px-4 py-6 rounded-b-3xl shadow-md mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">朋友圈</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMoments(false)}
                className="bg-white/80 backdrop-blur-sm border-0 hover:bg-white"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                返回聊天
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <CommunityPost
              username="旅行达人"
              avatar="/placeholder.svg?height=40&width=40"
              time="2小时前"
              content="刚刚在北京故宫拍到的照片，金秋时节的紫禁城真是太美了！推荐大家这个季节来游玩~"
              image="/placeholder.svg?height=200&width=400"
              likes={128}
              comments={32}
              color="blue"
            />
            <CommunityPost
              username="美食猎人"
              avatar="/placeholder.svg?height=40&width=40"
              time="5小时前"
              content="成都探店｜发现了一家超级正宗的川菜馆，麻婆豆腐简直绝了！地址在春熙路附近，感兴趣的朋友可以私信我～"
              image="/placeholder.svg?height=200&width=400"
              likes={95}
              comments={41}
              color="orange"
            />
            <CommunityPost
              username="背包客"
              avatar="/placeholder.svg?height=40&width=40"
              time="昨天"
              content="三亚自由行第三天，今天去了亚龙湾潜水，海水能见度超高，看到了好多漂亮的鱼！分享一些水下照片～"
              image="/placeholder.svg?height=200&width=400"
              likes={210}
              comments={45}
              color="teal"
            />
          </div>

          <Button className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-travel-blue hover:bg-travel-blue/90 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  )
}

function UserTab() {
  return (
    <div className="p-4 space-y-6">
      <div className="header-gradient -mx-4 -mt-4 px-4 py-8 rounded-b-3xl shadow-md mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <img src="/placeholder.svg?height=64&width=64" alt="用户头像" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold">游客用户</h2>
            <p className="text-white/80 text-sm">点击登录/注册</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="bg-gradient-travel h-1"></div>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2">
                <p className="font-bold text-travel-blue">0</p>
                <p className="text-xs text-muted-foreground">行程</p>
              </div>
              <div className="p-2">
                <p className="font-bold text-travel-teal">0</p>
                <p className="text-xs text-muted-foreground">收藏</p>
              </div>
              <div className="p-2">
                <p className="font-bold text-travel-purple">0</p>
                <p className="text-xs text-muted-foreground">关注</p>
              </div>
              <div className="p-2">
                <p className="font-bold text-travel-pink">0</p>
                <p className="text-xs text-muted-foreground">粉丝</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Link
            href="/settings"
            className="flex items-center justify-between p-3 bg-card rounded-lg shadow-sm border border-travel-blue/10 hover:border-travel-blue/30 transition-colors"
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-travel-blue" />
              <span>我的行程</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link
            href="/settings"
            className="flex items-center justify-between p-3 bg-card rounded-lg shadow-sm border border-travel-teal/10 hover:border-travel-teal/30 transition-colors"
          >
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-travel-teal" />
              <span>我的收藏</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link
            href="/settings"
            className="flex items-center justify-between p-3 bg-card rounded-lg shadow-sm border border-travel-purple/10 hover:border-travel-purple/30 transition-colors"
          >
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-3 text-travel-purple" />
              <span>我的朋友圈</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>

        <div className="space-y-2">
          <Link
            href="/settings"
            className="flex items-center justify-between p-3 bg-card rounded-lg shadow-sm border border-travel-pink/10 hover:border-travel-pink/30 transition-colors"
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-3 text-travel-pink" />
              <span>个人资料</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link
            href="/settings"
            className="flex items-center justify-between p-3 bg-card rounded-lg shadow-sm border border-travel-orange/10 hover:border-travel-orange/30 transition-colors"
          >
            <div className="flex items-center">
              <Compass className="h-5 w-5 mr-3 text-travel-orange" />
              <span>设置</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>

        <Button
          variant="outline"
          className="w-full border-travel-blue/20 text-travel-blue hover:bg-travel-blue/5 hover:text-travel-blue"
        >
          退出登录
        </Button>
      </div>
    </div>
  )
}

// 组件
function DestinationCard({
  name,
  image,
  description,
  type,
}: { name: string; image: string; description: string; type: string }) {
  return (
    <Link href="#" className="block">
      <Card className={`overflow-hidden destination-card destination-card-${type} border shadow-sm`}>
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-24 object-cover" />
        <CardContent className="p-2">
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function GuideCard({
  title,
  image,
  author,
  views,
  color,
}: { title: string; image: string; author: string; views: number; color: string }) {
  return (
    <Link href="#" className="block min-w-[200px] max-w-[200px]">
      <Card
        className={`overflow-hidden shadow-sm border-travel-${color}/20 hover:border-travel-${color}/40 transition-colors`}
      >
        <div className={`h-1 bg-travel-${color}`}></div>
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-24 object-cover" />
        <CardContent className="p-2">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{author}</span>
            <span>{views}浏览</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function InspirationCard({
  title,
  description,
  image,
  color,
}: { title: string; description: string; image: string; color: string }) {
  return (
    <Link href="#" className="block">
      <Card
        className={`overflow-hidden shadow-sm border-travel-${color}/20 hover:border-travel-${color}/40 transition-colors`}
      >
        <div className="flex">
          <img src={image || "/placeholder.svg"} alt={title} className="w-24 h-24 object-cover" />
          <CardContent className="p-3">
            <h3 className={`font-medium text-travel-${color}`}>{title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

function ItineraryCard({
  title,
  date,
  status,
  places,
}: {
  title: string
  date: string
  status: "upcoming" | "ongoing" | "completed"
  places: string[]
}) {
  return (
    <Card className="shadow-sm border-0 overflow-hidden">
      <div
        className={`h-1 ${status === "upcoming" ? "bg-travel-blue" : status === "ongoing" ? "bg-travel-green" : "bg-muted"}`}
      ></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {places.map((place, index) => (
                <Badge key={index} variant="outline" className={`badge-${index % 2 === 0 ? "travel" : "nature"}`}>
                  {place}
                </Badge>
              ))}
            </div>
          </div>
          <Badge variant={status === "completed" ? "outline" : "default"} className={`itinerary-${status}`}>
            {status === "upcoming" ? "即将出发" : status === "ongoing" ? "进行中" : "已完成"}
          </Badge>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" size="sm" className="border-travel-blue/20 text-travel-blue hover:bg-travel-blue/5">
            查看详情
          </Button>
          <Button size="sm" className="bg-travel-blue hover:bg-travel-blue/90">
            编辑
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ChatItem({
  name,
  avatar,
  lastMessage,
  time,
  unread,
  isGroup = false,
}: {
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  isGroup?: boolean
}) {
  return (
    <Link href="#" className="block">
      <div className={`flex items-center p-3 rounded-lg chat-item ${unread > 0 ? "unread" : ""}`}>
        <div className="relative">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full border border-muted" />
          {isGroup && (
            <div className="absolute bottom-0 right-0 bg-travel-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              群
            </div>
          )}
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium truncate">{name}</h3>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
        </div>
        {unread > 0 && (
          <div className="ml-2 bg-travel-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unread}
          </div>
        )}
      </div>
    </Link>
  )
}

function CommunityPost({
  username,
  avatar,
  time,
  content,
  image,
  likes,
  comments,
  color = "blue",
}: {
  username: string
  avatar: string
  time: string
  content: string
  image: string
  likes: number
  comments: number
  color?: string
}) {
  return (
    <Card className="shadow-sm border-0 overflow-hidden">
      <div className={`h-1 bg-travel-${color}`}></div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={avatar || "/placeholder.svg"}
            alt={username}
            className="w-10 h-10 rounded-full border border-muted"
          />
          <div>
            <p className="font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
        </div>
        <p className="mb-3">{content}</p>
        {image && <img src={image || "/placeholder.svg"} alt="Post" className="w-full rounded-md mb-3" />}
        <div className="flex justify-between text-muted-foreground text-sm">
          <Button variant="ghost" size="sm" className={`flex items-center gap-1 text-travel-${color}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            {comments}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-share"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
            分享
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
