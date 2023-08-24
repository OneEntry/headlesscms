import SwiftUI
import SDWebImageSwiftUI

struct DetailProductView: View {
    
    let product: ProductModel
    
    @State private var sizeScale: Double = 1
    
    @Environment(\.presentationMode) var presentationMode
    
    enum ProductSize: String, CaseIterable {
        
        case small = "Small"
        case medium = "Medium"
        case large = "Large"
        case extra_large = "Extra Large"
    }
    
    var body: some View {
        
        ZStack {
            
            Color.accent.ignoresSafeArea()
            
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
                
                Text("Detail")
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
            
            Spacer()
        }
    }
    
    @ViewBuilder
    private func ProductSliderView() -> some View {
        
        VStack {
            
            Slider(value: $sizeScale, in: 1...4, step: 1)
                .padding(.horizontal)
            
            HStack(spacing: 0) {
                
                ForEach(ProductSize.allCases, id: \.self) { size in
                    
                    Text(size.rawValue)
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
            
            Button("-") {
                
            }
            
            Text("10")
            
            Button("+") {
                
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
    ContentView()
}
