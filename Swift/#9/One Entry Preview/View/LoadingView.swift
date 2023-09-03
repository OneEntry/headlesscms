//
//  LoadingView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 24.07.2023.
//

import SwiftUI

struct LoadingView: View {
    var body: some View {
        
        ZStack {
            
            Color.white.ignoresSafeArea()
            
            ProgressView()
        }
    }
}

#Preview {
    LoadingView()
}
