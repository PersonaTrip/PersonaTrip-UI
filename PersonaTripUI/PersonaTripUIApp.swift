//
//  PersonaTripUIApp.swift
//  PersonaTripUI
//
//  Created by 张启航 on 2025/4/27.
//

import SwiftUI

@main
struct PersonaTripUIApp: App {
    @State private var isLoggedIn = false
    
    var body: some Scene {
        WindowGroup {
            if isLoggedIn {
                HomeView()
                    .onDisappear {
                        // 如果主页视图消失，则可能是用户登出
                        isLoggedIn = false
                    }
            } else {
                LoginView()
                    .onDisappear {
                        // 当登录视图消失时，表示用户已登录
                        isLoggedIn = true
                    }
            }
        }
    }
}
