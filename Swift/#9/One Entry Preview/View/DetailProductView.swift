//
//  DetailProductView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 24.07.2023.
//

import SwiftUI
import SDWebImageSwiftUI

struct DetailProductView: View {
    
    let product: ProductModel
    
    @State private var sizeScale: Double = 1
    
    @ObservedObject var cartViewModel: CartViewModel = .shared
    @ObservedObject var relatedProducts: PaginationViewModel = .init()
    
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        
        ZStack {
            
            AppColorPalette.primary.ignoresSafeArea()
            
            VStack(spacing: 30) {
                
                WebImage(url: URL(string: product.image?.downloadLink ?? ""))
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(maxHeight: 200)
                
                ZStack {
                    
                    Color.white
                        .clipShape(.rect(topLeadingRadius: 20, topTrailingRadius: 20))
                        .ignoresSafeArea(edges: .bottom)
                    
                    ProductContentView()
                        .padding()
                }
                .overlay(alignment: .topTrailing) {
                    
                    Text("\(product.rate ?? 0, specifier: "%.1f")")
                        .bold()
                        .padding()
                        .background(.yellow)
                        .clipShape(Circle())
                        .padding()
                        .offset(y: -40)
                }
            }
        }
        .task {
            
            await relatedProducts.loadMore(marker: product.id, endpoint: .related)
        }
        .navigationBarBackButtonHidden()
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            
            ToolbarItem(placement: .topBarLeading) {
                
                Button(action: { presentationMode.wrappedValue.dismiss() }) {
                    
                    Image(systemName: "arrow.left")
                        .font(.body.bold())
                }
                .tint(.white)
            }
            
            ToolbarItem(placement: .principal) {
                
                Text("Details")
                    .font(.title3)
                    .fontWeight(.semibold)
                    .foregroundStyle(.white)
            }
            
            ToolbarItem(placement: .topBarTrailing) {
                
                Button(action: { print("Bookmark") }) {
                    
                    Image(systemName: "bookmark")
                }
                .tint(.white)
            }
        }
    }
    
    @ViewBuilder
    private func ProductContentView() -> some View {
        
        ScrollView(showsIndicators: false) {
            
            VStack(alignment: .leading, spacing: 50) {
                
                Text(product.englishInfo?.title ?? "")
                    .font(.title2)
                    .fontWeight(.medium)
                          
                ProductSliderView()
                
                HStack {
                                    
                    let price = (product.price ?? 0) * sizeScale
                    
                    Text("\(price, specifier: "%.1f")")
                        .font(.title2)
                        .bold()
                        .padding()
                        .animation(.default, value: price)
                        .overlay(alignment: .topLeading) {
                            
                            Text("$")
                        }
                    
                    Spacer()
                    
                    CounterView()
                }
                
                if let products = relatedProducts.products, !products.isEmpty {
                    
                    Section {
                        
                        HStack {
                            
                            ForEach(products) { product in
                                
                                ProductView(product: product, style: .responsive)
                                    .frame(width: 100, height: 150)
                            }
                        }
                    } header: {
                        
                        Text("Related Products")
                            .bold()
                    }
                }
                
                Spacer()
            }
        }
    }
    
    @ViewBuilder
    private func ProductSliderView() -> some View {
        
        VStack {
            
            Slider(value: $sizeScale, in: 1...4, step: 1)
                .padding(.horizontal)
            
            HStack(spacing: 0) {
                
                ForEach(CartViewModel.ProductSize.allCases, id: \.self) { size in
                    
                    Text(size.description)
                        .font(.footnote)
                        .foregroundStyle(.gray)
                        .frame(maxWidth: .infinity)
                }
            }
        }
    }
    
    @ViewBuilder
    private func CounterView() -> some View {
        
        HStack(spacing: 15) {
            
            let size: CartViewModel.ProductSize = .init(rawValue: Int(sizeScale)) ?? .small
            let count = cartViewModel.getProductCount(with: product.id, with: size)
            
            Button("-") {
                
                cartViewModel.removeProduct(with: product.id, with: size)
            }
            
            Text("\(count)")
                .animation(.default, value: count)
            
            Button("+") {
                
                cartViewModel.addProduct(with: product.id, with: size)
            }
        }
        .padding(.horizontal)
        .padding(.vertical, 5)
        .background {
            
            Capsule()
                .stroke(Color(UIColor.systemGray3))
        }
    }
}

#Preview {
    
    NavigationView {
        
        ProductView(product: .init(id: 1,
                                   price: 255,
                                   localizeInfos: ["en_US" : .init(title: "Black", content: "", menuTitle: "")],
                                   attributeValues: [.init(image: [.init(size: 10, downloadLink: "https://application.oneentry.cloud/api/admin/files?type=page&id=undefined&entity=image&filename=Корабль_синий-1689884264916.png")], rate: "5.0")]
                                  ),
                    style: .detail
        )
    }
}
