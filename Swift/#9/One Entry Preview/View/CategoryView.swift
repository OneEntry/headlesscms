//
//  CategoriesView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 25.07.2023.
//

import SwiftUI

struct CategoryView: View {
    
    let category: PageModel
    let style: Style
    
    enum Style {
        
        case small
        case detail
    }
    
    var body: some View {
                
        switch style {
            case .small: SmallCategoryView()
            case .detail: DetailCategoryView()
        }
    }
    
    @ViewBuilder
    private func SmallCategoryView() -> some View {
        
        VStack(alignment: .trailing) {
            
            Text(category.englishInfo?.title ?? "")
            
            Text("\(category.viewModel.total ?? 0)")
                .foregroundStyle(AppColorPalette.primary)
        }
        .frame(maxWidth: 200)
        .padding()
        .background {
            
            RoundedRectangle(cornerRadius: 25.0)
                .stroke(.gray)
        }
    }
    
    @ViewBuilder
    private func DetailCategoryView() -> some View {
        
        if let products = category.viewModel.products {
            
            Section {
                
                ForEach(products) { product in
                    
                    NavigationLink(destination: ProductView(product: product, style: .detail)) {
                        
                        ProductView(product: product, style: .responsive)
                            .foregroundStyle(.black)
                    }
                }
                
            } header: {
                
                HStack {
                    
                    Text(category.englishInfo?.title ?? "")
                    
                    Spacer()
                    
                    Button("More") {}
                }
            }
        }
    }
}

#Preview {
    
    ContentView()
}
