//
//  ProductView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 24.07.2023.
//

import SwiftUI
import SDWebImageSwiftUI

struct ProductView: View {
    
    let product: ProductModel
    let style: Style
    
    enum Style {
        
        case responsive
        case detail
    }
    
    var body: some View {
        
        switch style {
            case .responsive: ResponsiveProductView()
            case .detail: DetailProductView(product: product)
        }
    }
    
    @ViewBuilder
    private func ResponsiveProductView() -> some View {
        
        ViewThatFits {
            
            MediumProductView()
            
            SmallProductView()
        }
    }
    
    @ViewBuilder
    private func SmallProductView() -> some View {
        
        VStack {
            
            WebImage(url: URL(string: product.image?.downloadLink ?? ""))
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxHeight: 100)
            
            Text(product.englishInfo?.title ?? "")
                .bold()
            
            Text("$ \(product.price ?? 0, specifier: "%.1f")")
                .font(.footnote)
                .fontWeight(.semibold)
        }
        .foregroundStyle(.white)
        .frame(maxWidth: 100, maxHeight: 180)
        .padding(.horizontal, 20)
        .padding(.vertical, 10)
        .background(AppColorPalette.primary)
        .cornerRadius(15)
    }
    
    @ViewBuilder
    private func MediumProductView() -> some View {
        
        HStack {
            
            WebImage(url: URL(string: product.image?.downloadLink ?? ""))
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxWidth: 50, maxHeight: 70)
                .padding()
                .background(AppColorPalette.subviewsBackground)
                .cornerRadius(10)
                .overlay(alignment: .bottom) {
                    
                    Label("\(product.rate ?? 0, specifier: "%.1f")", systemImage: "star.fill")
                        .font(.footnote)
                        .bold()
                        .foregroundStyle(.white)
                        .padding(.horizontal, 15)
                        .padding(.vertical, 2)
                        .background(AppColorPalette.primary)
                        .clipShape(Capsule())
                        .offset(y: 8)
                }
            
            VStack(alignment: .leading) {
                
                Text(product.englishInfo?.title ?? "")
                    .fontWeight(.semibold)
                
                Spacer()
                
                Text("$ \(product.price ?? 0, specifier: "%.1f")")
                    .foregroundStyle(AppColorPalette.primary)
                    .fontWeight(.semibold)
            }
            .frame(maxHeight: .infinity)
            .padding()
        }
        .fixedSize()
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

#Preview {
    
    NavigationView {
        
        ProductView(product: .init(id: 1,
                                   price: 255,
                                   localizeInfos: ["en_US" : .init(title: "Black", content: "", menuTitle: "")],
                                   attributeValues: [.init(image: [.init(size: 10, downloadLink: "https://application.oneentry.cloud/api/admin/files?type=page&id=undefined&entity=image&filename=Корабль_синий-1689884264916.png")], rate: "5.0")]
                                  ),
                    style: .responsive
        )
        .frame(maxWidth: .infinity)
    }
}
