//
//  LoginView.swift
//  PersonaTripUI
//
//  Created by 张启航 on 2025/4/27.
//

import SwiftUI

struct LoginView: View {
    @State private var phoneNumber = ""
    @State private var verificationCode = ""
    @State private var password = ""
    @State private var loginMode: LoginMode = .phone
    @State private var isSendingCode = false
    @State private var countdown = 0
    @State private var timer: Timer?
    @Environment(\.dismiss) private var dismiss
    
    enum LoginMode {
        case phone, password
    }
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // 标题
                VStack(spacing: 8) {
                    Text("旅途")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                    
                    Text("探索世界的每一个角落")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                }
                .padding(.top, 40)
                .padding(.bottom, 20)
                
                // 登录方式选择器
                Picker("登录方式", selection: $loginMode) {
                    Text("手机号登录").tag(LoginMode.phone)
                    Text("密码登录").tag(LoginMode.password)
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                
                // 表单
                VStack(spacing: 20) {
                    if loginMode == .phone {
                        // 手机号验证码登录
                        VStack(alignment: .leading, spacing: 8) {
                            Text("手机号")
                                .font(.headline)
                            
                            TextField("请输入手机号", text: $phoneNumber)
                                .keyboardType(.phonePad)
                                .padding()
                                .background(Color(.systemGray6))
                                .cornerRadius(10)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("验证码")
                                .font(.headline)
                            
                            HStack {
                                TextField("请输入验证码", text: $verificationCode)
                                    .keyboardType(.numberPad)
                                    .padding()
                                    .background(Color(.systemGray6))
                                    .cornerRadius(10)
                                
                                Button(action: sendVerificationCode) {
                                    Text(isSendingCode ? "\(countdown)秒后重发" : "获取验证码")
                                        .fontWeight(.medium)
                                        .foregroundColor(.white)
                                        .padding(.vertical, 12)
                                        .padding(.horizontal, 10)
                                        .background(
                                            RoundedRectangle(cornerRadius: 10)
                                                .fill(phoneNumber.count == 11 && !isSendingCode ? Color.blue : Color.gray)
                                        )
                                        .lineLimit(1)
                                        .minimumScaleFactor(0.5)
                                }
                                .disabled(phoneNumber.count != 11 || isSendingCode)
                            }
                        }
                    } else {
                        // 手机号密码登录
                        VStack(alignment: .leading, spacing: 8) {
                            Text("手机号")
                                .font(.headline)
                            
                            TextField("请输入手机号", text: $phoneNumber)
                                .keyboardType(.phonePad)
                                .padding()
                                .background(Color(.systemGray6))
                                .cornerRadius(10)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text("密码")
                                    .font(.headline)
                                
                                Spacer()
                                
                                NavigationLink(destination: Text("找回密码页面")) {
                                    Text("忘记密码?")
                                        .font(.subheadline)
                                        .foregroundColor(.blue)
                                }
                            }
                            
                            SecureField("请输入密码", text: $password)
                                .padding()
                                .background(Color(.systemGray6))
                                .cornerRadius(10)
                        }
                    }
                }
                .padding(.horizontal)
                
                // 登录按钮
                Button(action: login) {
                    Text("登录")
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(10)
                }
                .padding(.horizontal)
                .padding(.top, 10)
                
                // 社交账号登录分割线
                HStack {
                    VStack { Divider() }
                    
                    Text("社交账号登录")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .padding(.horizontal, 10)
                    
                    VStack { Divider() }
                }
                .padding(.horizontal)
                .padding(.top, 20)
                
                // 社交登录按钮
                HStack(spacing: 30) {
                    Button(action: { loginWithSocial(type: "wechat") }) {
                        SocialLoginButton(icon: "wechat", color: Color.green)
                    }
                    
                    Button(action: { loginWithSocial(type: "qq") }) {
                        SocialLoginButton(icon: "qq", color: Color.blue)
                    }
                }
                .padding(.top, 10)
                
                // 注册提示
                HStack {
                    Text("还没有账号?")
                        .foregroundColor(.gray)
                    
                    NavigationLink(destination: RegisterView()) {
                        Text("立即注册")
                            .foregroundColor(.blue)
                    }
                }
                .padding(.top, 20)
                
                Spacer()
            }
            .navigationBarHidden(true)
        }
    }
    
    private func sendVerificationCode() {
        if phoneNumber.count != 11 {
            // 显示错误提示
            return
        }
        
        isSendingCode = true
        countdown = 60
        
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { timer in
            if countdown > 1 {
                countdown -= 1
            } else {
                timer.invalidate()
                isSendingCode = false
                countdown = 0
            }
        }
        
        // 这里实现发送验证码的逻辑
        print("发送验证码到: \(phoneNumber)")
    }
    
    private func login() {
        if loginMode == .phone {
            // 手机号验证码登录逻辑
            print("验证码登录: \(phoneNumber), \(verificationCode)")
        } else {
            // 密码登录逻辑
            print("密码登录: \(phoneNumber), \(password)")
        }
        
        // 登录成功后跳转到主页
        dismiss()
    }
    
    private func loginWithSocial(type: String) {
        print("社交登录: \(type)")
        // 实现社交登录逻辑
    }
}

// 社交登录按钮组件
struct SocialLoginButton: View {
    let icon: String
    let color: Color
    
    var body: some View {
        VStack {
            ZStack {
                Circle()
                    .fill(color.opacity(0.1))
                    .frame(width: 50, height: 50)
                
                Image(icon)
                    .resizable()
                    .scaledToFit()
                    .frame(width: 25, height: 25)
                    .foregroundColor(color)
            }
        }
    }
}

struct RegisterView: View {
    var body: some View {
        Text("注册页面")
            .navigationTitle("注册")
    }
}

#Preview {
    LoginView()
} 