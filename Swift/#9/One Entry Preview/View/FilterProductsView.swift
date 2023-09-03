//
//  FilterProductsView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 01.09.2023.
//

import SwiftUI

extension TextField {
    
    func limit(_ promt: String) -> some View {
        
        self
            .textFieldStyle(.roundedBorder)
            .padding()
            .overlay(alignment: .topLeading) {
                
                Text(promt)
                    .font(.footnote)
                    .foregroundStyle(.gray)
                    .padding(.leading)
            }
    }
}

struct FilterProductsView: View {
    
    @State private var sheetActive = true
    @State private var dismiss = true
    
    @ObservedObject private var filterViewModel: PriceFilterViewModel = .init()
    
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        
        ZStack {
            
            if let products = filterViewModel.products {
                
                ScrollView {
                    
                    VStack(spacing: 40) {
                        
                        ForEach(products) { product in
                            
                            ProductView(product: product, style: .responsive)
                        }
                    }
                    .padding()
                }
                
            } else {
                
                ProgressView()
            }
        }
        .navigationTitle("Filter")
        .toolbar {
            
            ToolbarItem(placement: .topBarTrailing) {
                
                Button {
                    
                    dismiss = true
                    sheetActive = true
                    
                } label: {
                    
                    Image(systemName: "gear")
                }
            }
        }
        .sheet(isPresented: $sheetActive, onDismiss: onSheetDismiss) {
            
            FilterView()
                .padding()
                .presentationDetents([.medium])
                .presentationDragIndicator(.visible)
        }
    }
    
    private func onSheetDismiss() {
        
        if dismiss && filterViewModel.products == nil {
            
            presentationMode.wrappedValue.dismiss()
            
            return
        }
        
        Task {
            
            await filterViewModel.loadMore()
        }
    }
    
    @ViewBuilder
    private func FilterView() -> some View {
        
        Section {
            
            HStack {
                
                TextField("Low", value: $filterViewModel.lowLimit, format: .number)
                    .limit("Low")
                
                Divider()
                    .frame(height: 10)
                
                TextField("Low", value: $filterViewModel.hightLimit, format: .number)
                    .limit("Hight")
            }
        } header: {
            
            Text("Price Filer")
                .font(.title)
                .bold()
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(maxHeight: .infinity, alignment: .top)
        .safeAreaInset(edge: .bottom) {
            
            Button("Show variants") {
                
                filterViewModel.reset()
                dismiss = false
                sheetActive = false
            }
            .foregroundStyle(.primary)
            .frame(maxWidth: .infinity)
            .padding(8)
            .background(.accent)
            .clipShape(Capsule())
        }
    }
}

#Preview {
    FilterProductsView()
}
