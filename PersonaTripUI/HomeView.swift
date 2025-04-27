//
//  HomeView.swift
//  PersonaTripUI
//
//  Created by 张启航 on 2025/4/27.
//

import SwiftUI

struct HomeView: View {
    @State private var selectedTab: Tab = .home
    
    enum Tab {
        case home, itinerary, guide, friends, user
    }
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeTabView()
                .tabItem {
                    Label("首页", systemImage: "safari")
                }
                .tag(Tab.home)
            
            ItineraryTabView()
                .tabItem {
                    Label("行程", systemImage: "calendar")
                }
                .tag(Tab.itinerary)
            
            GuideTabView()
                .tabItem {
                    Label("AI助手", systemImage: "message")
                }
                .tag(Tab.guide)
            
            FriendsTabView()
                .tabItem {
                    Label("朋友", systemImage: "bubble.left")
                }
                .tag(Tab.friends)
            
            UserTabView()
                .tabItem {
                    Label("用户", systemImage: "person")
                }
                .tag(Tab.user)
        }
    }
}

// MARK: - 首页标签页
struct HomeTabView: View {
    @State private var searchText = ""
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // 搜索框
                    VStack(alignment: .leading, spacing: 16) {
                        Text("探索旅途")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                        
                        HStack {
                            Image(systemName: "magnifyingglass")
                                .foregroundColor(.gray)
                            
                            TextField("搜索目的地、景点、攻略...", text: $searchText)
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(10)
                    }
                    .padding(.horizontal)
                    
                    // 热门目的地
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("热门目的地")
                                .font(.headline)
                                .fontWeight(.bold)
                            
                            Spacer()
                            
                            Button(action: {}) {
                                HStack {
                                    Text("查看全部")
                                        .font(.subheadline)
                                        .foregroundColor(.blue)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.caption)
                                }
                            }
                        }
                        
                        LazyVGrid(columns: [
                            GridItem(.flexible()),
                            GridItem(.flexible())
                        ], spacing: 16) {
                            DestinationCard(name: "北京", description: "探索古都文化", imageName: "beijing")
                            DestinationCard(name: "上海", description: "感受现代魅力", imageName: "shanghai")
                            DestinationCard(name: "成都", description: "品味休闲生活", imageName: "chengdu")
                            DestinationCard(name: "三亚", description: "享受阳光海滩", imageName: "sanya")
                        }
                    }
                    .padding(.horizontal)
                    
                    // 精选攻略
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("精选攻略")
                                .font(.headline)
                                .fontWeight(.bold)
                            
                            Spacer()
                            
                            Button(action: {}) {
                                HStack {
                                    Text("查看全部")
                                        .font(.subheadline)
                                        .foregroundColor(.blue)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.caption)
                                }
                            }
                        }
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 16) {
                                GuideCard(title: "北京三日游完美攻略", author: "旅行达人", views: 1234, color: .blue)
                                GuideCard(title: "上海必去景点TOP10", author: "城市探索者", views: 987, color: .purple)
                                GuideCard(title: "成都美食地图", author: "吃货指南", views: 2345, color: .green)
                                GuideCard(title: "三亚海滩度假全攻略", author: "阳光沙滩", views: 876, color: .orange)
                            }
                            .padding(.vertical, 4)
                        }
                    }
                    .padding(.horizontal)
                    
                    // 旅行灵感
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("旅行灵感")
                                .font(.headline)
                                .fontWeight(.bold)
                            
                            Spacer()
                            
                            Button(action: {}) {
                                HStack {
                                    Text("查看全部")
                                        .font(.subheadline)
                                        .foregroundColor(.blue)
                                    
                                    Image(systemName: "chevron.right")
                                        .font(.caption)
                                }
                            }
                        }
                        
                        InspirationCardList()
                    }
                    .padding(.horizontal)
                }
                .padding(.vertical)
            }
        }
    }
}

// MARK: - 行程标签页
struct ItineraryTabView: View {
    @State private var segmentSelection = 0
    let segments = ["即将出行", "正在进行", "已完成"]
    
    var body: some View {
        NavigationStack {
            VStack {
                // 分段控制器
                Picker("行程状态", selection: $segmentSelection) {
                    ForEach(0..<segments.count, id: \.self) { index in
                        Text(segments[index]).tag(index)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                
                // 行程列表
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(0..<5, id: \.self) { index in
                            ItineraryCard(
                                title: "北京旅行",
                                date: "2025年5月1日 - 2025年5月3日",
                                status: segmentSelection == 0 ? .upcoming : (segmentSelection == 1 ? .ongoing : .completed),
                                places: ["故宫博物院", "颐和园", "长城", "天坛公园"]
                            )
                        }
                    }
                    .padding()
                }
                
                // 添加行程按钮
                Button(action: {}) {
                    HStack {
                        Image(systemName: "plus")
                        Text("添加新行程")
                    }
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
                }
                .padding()
            }
            .navigationTitle("我的行程")
        }
    }
}

// MARK: - AI助手标签页
struct GuideTabView: View {
    @State private var messageText = ""
    @State private var messages: [ChatMessage] = [
        ChatMessage(isUser: false, text: "你好！我是你的旅行助手。有什么可以帮助你的吗？"),
        ChatMessage(isUser: true, text: "我想去北京旅游，有什么推荐？"),
        ChatMessage(isUser: false, text: "北京是一个历史文化名城，有很多值得参观的景点。我建议你可以安排参观故宫、颐和园、长城等地方。你想了解更详细的行程规划吗？")
    ]
    
    var body: some View {
        VStack {
            // 消息列表
            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(messages, id: \.id) { message in
                        ChatBubble(message: message)
                    }
                }
                .padding()
            }
            
            // 输入框
            HStack {
                TextField("输入问题...", text: $messageText)
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(20)
                
                Button(action: sendMessage) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.white)
                        .padding(10)
                        .background(Color.blue)
                        .clipShape(Circle())
                }
            }
            .padding()
        }
        .navigationTitle("AI旅行助手")
    }
    
    private func sendMessage() {
        guard !messageText.isEmpty else { return }
        
        // 添加用户消息
        let userMessage = ChatMessage(isUser: true, text: messageText)
        messages.append(userMessage)
        
        // 清空输入框
        messageText = ""
        
        // 模拟AI回复
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            let aiResponse = ChatMessage(isUser: false, text: "感谢你的提问！我正在思考中...")
            messages.append(aiResponse)
        }
    }
}

// MARK: - 朋友标签页
struct FriendsTabView: View {
    @State private var selectedSegment = 0
    
    var body: some View {
        NavigationStack {
            VStack {
                // 分段控制器
                Picker("内容类型", selection: $selectedSegment) {
                    Text("消息").tag(0)
                    Text("社区").tag(1)
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                
                if selectedSegment == 0 {
                    // 消息列表
                    List {
                        ChatListItem(name: "旅行小组", avatar: "group", lastMessage: "张三: 大家看看这个行程安排怎么样？", time: "10:30", unread: 3, isGroup: true)
                        ChatListItem(name: "李四", avatar: "person.crop.circle", lastMessage: "下周一起去爬山吗？", time: "昨天", unread: 1)
                        ChatListItem(name: "王五", avatar: "person.crop.circle", lastMessage: "照片已收到，风景真美！", time: "周二", unread: 0)
                        
                        ForEach(0..<10, id: \.self) { i in
                            ChatListItem(name: "联系人 \(i+1)", avatar: "person.crop.circle", lastMessage: "一条消息内容...", time: "3天前", unread: 0)
                        }
                    }
                    .listStyle(.plain)
                } else {
                    // 社区内容
                    ScrollView {
                        LazyVStack(spacing: 16) {
                            ForEach(0..<6, id: \.self) { i in
                                CommunityPost(
                                    username: "旅行爱好者\(i+1)",
                                    avatar: "person.crop.circle",
                                    time: "\(i+1)小时前",
                                    content: "刚刚在这个美丽的地方度过了一段难忘的时光，分享给大家！",
                                    imageName: "travel\(i%4+1)",
                                    likes: Int.random(in: 10...200),
                                    comments: Int.random(in: 5...50)
                                )
                            }
                        }
                        .padding()
                    }
                }
            }
            .navigationTitle("社交")
        }
    }
}

// MARK: - 用户标签页
struct UserTabView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // 用户信息卡片
                    VStack {
                        HStack(spacing: 16) {
                            Image(systemName: "person.crop.circle.fill")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 80, height: 80)
                                .foregroundColor(.blue)
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text("旅行爱好者")
                                    .font(.title2)
                                    .fontWeight(.bold)
                                
                                Text("用户ID: 12345678")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                
                                HStack {
                                    Text("已完成旅行: 12次")
                                        .font(.caption)
                                        .foregroundColor(.gray)
                                    
                                    Divider()
                                        .frame(height: 10)
                                    
                                    Text("旅行总天数: 56天")
                                        .font(.caption)
                                        .foregroundColor(.gray)
                                }
                            }
                            
                            Spacer()
                        }
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(12)
                    }
                    .padding(.horizontal)
                    
                    // 功能按钮列表
                    VStack(spacing: 1) {
                        NavigationLink(destination: Text("我的收藏")) {
                            UserMenuRow(icon: "bookmark.fill", title: "我的收藏", hasNotification: false)
                        }
                        
                        NavigationLink(destination: Text("我的攻略")) {
                            UserMenuRow(icon: "doc.text.fill", title: "我的攻略", hasNotification: true)
                        }
                        
                        NavigationLink(destination: Text("消息通知")) {
                            UserMenuRow(icon: "bell.fill", title: "消息通知", hasNotification: true)
                        }
                        
                        NavigationLink(destination: Text("帮助中心")) {
                            UserMenuRow(icon: "questionmark.circle.fill", title: "帮助中心", hasNotification: false)
                        }
                        
                        NavigationLink(destination: Text("设置")) {
                            UserMenuRow(icon: "gearshape.fill", title: "设置", hasNotification: false)
                        }
                    }
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding(.horizontal)
                    
                    // 退出登录按钮
                    Button(action: {}) {
                        Text("退出登录")
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                    }
                    .padding(.horizontal)
                }
                .padding(.vertical)
            }
            .navigationTitle("个人中心")
        }
    }
}

// MARK: - 组件

// 目的地卡片
struct DestinationCard: View {
    let name: String
    let description: String
    let imageName: String
    
    var body: some View {
        VStack(alignment: .leading) {
            ZStack(alignment: .bottomLeading) {
                Image(systemName: "photo")
                    .resizable()
                    .scaledToFill()
                    .frame(height: 120)
                    .clipped()
                    .background(Color(.systemGray4))
                
                LinearGradient(
                    gradient: Gradient(colors: [.clear, .black.opacity(0.7)]),
                    startPoint: .top,
                    endPoint: .bottom
                )
            }
            .cornerRadius(12)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(name)
                    .font(.headline)
                
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            .padding(.vertical, 8)
        }
    }
}

// 攻略卡片
struct GuideCard: View {
    let title: String
    let author: String
    let views: Int
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading) {
            ZStack(alignment: .topLeading) {
                Image(systemName: "photo")
                    .resizable()
                    .scaledToFill()
                    .frame(width: 200, height: 120)
                    .clipped()
                    .background(color.opacity(0.3))
                    .cornerRadius(12)
                
                Text(author)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(color.opacity(0.8))
                    .foregroundColor(.white)
                    .cornerRadius(8)
                    .padding(8)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .lineLimit(2)
                
                HStack {
                    Image(systemName: "eye")
                        .font(.caption)
                    
                    Text("\(views)")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            .frame(width: 200)
            .padding(.top, 4)
        }
    }
}

// 灵感卡片列表
struct InspirationCardList: View {
    let inspirations = [
        (title: "自然风光", description: "探索壮丽的山川河流", color: Color.green),
        (title: "城市文化", description: "感受现代都市脉搏", color: Color.blue),
        (title: "美食之旅", description: "品尝各地特色美食", color: Color.orange),
        (title: "历史古迹", description: "重温辉煌的历史遗产", color: Color.purple)
    ]
    
    var body: some View {
        LazyVGrid(columns: [GridItem(.flexible())], spacing: 16) {
            ForEach(0..<inspirations.count, id: \.self) { index in
                InspirationCard(
                    title: inspirations[index].title,
                    description: inspirations[index].description,
                    color: inspirations[index].color
                )
            }
        }
    }
}

// 灵感卡片
struct InspirationCard: View {
    let title: String
    let description: String
    let color: Color
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            Circle()
                .fill(color.opacity(0.2))
                .frame(width: 50, height: 50)
                .overlay(
                    Image(systemName: "arrow.right")
                        .foregroundColor(color)
                )
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

// 行程卡片
struct ItineraryCard: View {
    let title: String
    let date: String
    let status: ItineraryStatus
    let places: [String]
    
    enum ItineraryStatus {
        case upcoming, ongoing, completed
        
        var color: Color {
            switch self {
            case .upcoming: return .blue
            case .ongoing: return .green
            case .completed: return .gray
            }
        }
        
        var label: String {
            switch self {
            case .upcoming: return "即将出行"
            case .ongoing: return "正在进行"
            case .completed: return "已完成"
            }
        }
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.headline)
                    
                    Text(date)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Text(status.label)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(status.color.opacity(0.2))
                    .foregroundColor(status.color)
                    .cornerRadius(8)
            }
            
            HStack(spacing: 4) {
                ForEach(places.prefix(3), id: \.self) { place in
                    Text(place)
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                }
                
                if places.count > 3 {
                    Text("+\(places.count - 3)")
                        .font(.caption)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color(.systemGray6))
                        .cornerRadius(8)
                }
            }
            
            HStack {
                Button(action: {}) {
                    Text("查看详情")
                        .font(.subheadline)
                        .foregroundColor(.blue)
                }
                
                Spacer()
                
                if status != .completed {
                    Button(action: {}) {
                        Text("编辑")
                            .font(.subheadline)
                            .foregroundColor(.orange)
                    }
                }
            }
        }
        .padding()
        .background(Color.white)
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 2)
    }
}

// 聊天气泡
struct ChatBubble: View {
    let message: ChatMessage
    
    var body: some View {
        HStack {
            if message.isUser {
                Spacer()
                
                Text(message.text)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(20)
                    .cornerRadius(20, corners: [.topRight, .bottomLeft, .bottomRight])
            } else {
                VStack(alignment: .leading) {
                    Text(message.text)
                        .padding()
                        .background(Color(.systemGray6))
                        .foregroundColor(.primary)
                        .cornerRadius(20)
                        .cornerRadius(20, corners: [.topLeft, .topRight, .bottomRight])
                }
                
                Spacer()
            }
        }
    }
}

// 聊天列表项
struct ChatListItem: View {
    let name: String
    let avatar: String
    let lastMessage: String
    let time: String
    let unread: Int
    var isGroup: Bool = false
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: avatar)
                .resizable()
                .scaledToFit()
                .frame(width: 50, height: 50)
                .background(Color(.systemGray5))
                .clipShape(Circle())
            
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(name)
                        .font(.headline)
                    
                    if isGroup {
                        Image(systemName: "person.3.fill")
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                    
                    Spacer()
                    
                    Text(time)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                HStack {
                    Text(lastMessage)
                        .font(.subheadline)
                        .foregroundColor(.gray)
                        .lineLimit(1)
                    
                    Spacer()
                    
                    if unread > 0 {
                        Text("\(unread)")
                            .font(.caption)
                            .foregroundColor(.white)
                            .frame(width: 20, height: 20)
                            .background(Color.red)
                            .clipShape(Circle())
                    }
                }
            }
        }
        .padding(.vertical, 4)
    }
}

// 社区帖子
struct CommunityPost: View {
    let username: String
    let avatar: String
    let time: String
    let content: String
    let imageName: String
    let likes: Int
    let comments: Int
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // 用户信息
            HStack {
                Image(systemName: avatar)
                    .resizable()
                    .scaledToFit()
                    .frame(width: 40, height: 40)
                    .background(Color(.systemGray5))
                    .clipShape(Circle())
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(username)
                        .font(.headline)
                    
                    Text(time)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                Button(action: {}) {
                    Image(systemName: "ellipsis")
                        .foregroundColor(.gray)
                }
            }
            
            // 帖子内容
            Text(content)
                .font(.body)
            
            // 帖子图片
            Image(systemName: "photo")
                .resizable()
                .scaledToFill()
                .frame(height: 200)
                .clipped()
                .cornerRadius(12)
                .background(Color(.systemGray4))
            
            // 帖子互动
            HStack {
                Button(action: {}) {
                    HStack {
                        Image(systemName: "heart")
                        Text("\(likes)")
                    }
                    .foregroundColor(.gray)
                }
                
                Spacer()
                
                Button(action: {}) {
                    HStack {
                        Image(systemName: "bubble.left")
                        Text("\(comments)")
                    }
                    .foregroundColor(.gray)
                }
                
                Spacer()
                
                Button(action: {}) {
                    HStack {
                        Image(systemName: "square.and.arrow.up")
                        Text("分享")
                    }
                    .foregroundColor(.gray)
                }
            }
            .font(.subheadline)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

// 用户菜单行
struct UserMenuRow: View {
    let icon: String
    let title: String
    let hasNotification: Bool
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(.blue)
                .frame(width: 24, height: 24)
            
            Text(title)
                .font(.body)
            
            Spacer()
            
            if hasNotification {
                Circle()
                    .fill(Color.red)
                    .frame(width: 8, height: 8)
            }
            
            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundColor(.gray)
        }
        .padding()
        .background(Color.white)
    }
}

// MARK: - 辅助类型

struct ChatMessage: Identifiable {
    let id = UUID()
    let isUser: Bool
    let text: String
}

// 辅助扩展 - 为特定角落设置圆角
extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners))
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners
    
    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(
            roundedRect: rect,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        )
        return Path(path.cgPath)
    }
}

#Preview {
    HomeView()
}