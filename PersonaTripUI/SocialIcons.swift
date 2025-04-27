//
//  SocialIcons.swift
//  PersonaTripUI
//
//  Created by 张启航 on 2025/4/27.
//

import SwiftUI

struct WechatIcon: View {
    var body: some View {
        Image(systemName: "message.fill")
            .resizable()
            .scaledToFit()
    }
}

struct QqIcon: View {
    var body: some View {
        Image(systemName: "bubble.left.fill")
            .resizable()
            .scaledToFit()
    }
}

#Preview {
    HStack(spacing: 20) {
        WechatIcon()
            .frame(width: 30, height: 30)
            .foregroundColor(.green)
        
        QqIcon()
            .frame(width: 30, height: 30)
            .foregroundColor(.blue)
    }
    .padding()
} 