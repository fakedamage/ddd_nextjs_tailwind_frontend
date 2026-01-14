#!/bin/bash

# Verifica se o argumento foi fornecido
if [ -z "$1" ]; then
    echo "❌ Erro: Você deve fornecer o nome do módulo."
    echo "Uso: $0 <nome-do-modulo>"
    exit 1
fi

MODULE_NAME="$1"
MODULE_PATH="modules/${MODULE_NAME}"

# Verifica se o módulo existe
if [ ! -d "$MODULE_PATH" ]; then
    echo "❌ Erro: O módulo '$MODULE_NAME' não existe em '$MODULE_PATH'"
    exit 1
fi

echo "📁 Módulo: $MODULE_NAME"
echo "📍 Caminho: $MODULE_PATH"
echo "📋 Gerando relatório..."
echo ""

# Função para imprimir a árvore de diretórios com caminho completo
print_tree() {
    echo "🌳 ESTRUTURA DA ÁRVORE:"
    echo "======================="
    
    # Encontra e exibe todos os arquivos com caminho completo a partir de modules/
    find "$MODULE_PATH" -type f | sort | while read file; do
        # Calcula a profundidade para indentação
        # Remove tudo antes de modules/ para calcular indentação relativa
        rel_path="${file#*/}"  # Remove o primeiro diretório (geralmente . ou /caminho/completo)
        rel_path="${rel_path#*/}"  # Remove modules/
        depth=$(echo "$rel_path" | tr -cd '/' | wc -c)
        indent=$(printf "%${depth}s" "" | tr ' ' '  ')
        
        # Exibe o caminho completo começando com modules/
        full_path="$file"
        # Se o caminho não começar com modules/, ajusta
        if [[ "$full_path" != modules/* ]]; then
            # Tenta obter o caminho relativo
            if [[ "$PWD" == */modules/* ]]; then
                # Se estiver em um diretório que contém modules
                full_path="${file#$PWD/}"
            else
                # Usa o caminho a partir do diretório atual
                full_path="$file"
            fi
        fi
        echo "${indent}📄 $full_path"
    done
    echo ""
}

# Função para listar arquivos com conteúdo
list_files_with_content() {
    echo "📝 CONTEÚDO DOS ARQUIVOS:"
    echo "=========================="
    
    # Contador para organização
    file_count=0
    
    find "$MODULE_PATH" -type f | sort | while read file; do
        # Usa o caminho completo do arquivo
        full_path="$file"
        # Se possível, mostra caminho relativo a partir do diretório atual
        rel_path="${file#$PWD/}"
        file_count=$((file_count + 1))
        
        echo ""
        echo "➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖"
        echo "📄 ARQUIVO #${file_count}: $rel_path"
        echo "📍 Caminho completo: $file"
        echo "📏 Tamanho: $(wc -l < "$file") linhas"
        echo "➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖"
        echo ""
        
        # Exibe o conteúdo com numeração de linhas
        echo "📋 CONTEÚDO:"
        echo "-----------"
        cat -n "$file"
        echo ""
    done
}

# Função para gerar resumo
generate_summary() {
    echo "📊 RESUMO DO MÓDULO:"
    echo "===================="
    
    total_files=$(find "$MODULE_PATH" -type f | wc -l)
    total_lines=$(find "$MODULE_PATH" -type f -exec cat {} \; | wc -l)
    total_size=$(du -sh "$MODULE_PATH" | cut -f1)
    
    echo "📈 Estatísticas:"
    echo "   • Total de arquivos: $total_files"
    echo "   • Total de linhas: $total_lines"
    echo "   • Tamanho total: $total_size"
    
    echo ""
    echo "📂 Distribuição por tipo:"
    echo "-----------------------"
    
    # Conta arquivos por extensão
    echo "Extensão | Quantidade | Exemplo"
    echo "---------|------------|---------"
    
    find "$MODULE_PATH" -type f -name "*.*" | sed 's/.*\.//' | sort | uniq -c | while read count ext; do
        example=$(find "$MODULE_PATH" -name "*.$ext" -type f | head -1 | xargs basename)
        printf "%-8s | %-10s | %s\n" ".$ext" "$count" "$example"
    done
    
    # Arquivos sem extensão
    no_ext=$(find "$MODULE_PATH" -type f ! -name "*.*" | wc -l)
    if [ "$no_ext" -gt 0 ]; then
        example=$(find "$MODULE_PATH" -type f ! -name "*.*" | head -1 | xargs basename)
        printf "%-8s | %-10s | %s\n" "(sem)" "$no_ext" "$example"
    fi
    
    echo ""
}

# Opções de output
OUTPUT_FILE="nextjs_project_${MODULE_NAME}_$(date +%Y%m%d_%H%M%S).txt"

echo "📊 Relatório será salvo em: $OUTPUT_FILE"
echo ""

# Gera o relatório completo
{
    echo "========================================"
    echo "RELATÓRIO DO MÓDULO: $MODULE_NAME"
    echo "Gerado em: $(date)"
    echo "========================================"
    echo ""
    
    print_tree
    echo ""
    
    generate_summary
    echo ""
    
    list_files_with_content
    
    echo ""
    echo "========================================"
    echo "FIM DO RELATÓRIO"
    echo "========================================"
} > "$OUTPUT_FILE"

echo "✅ Relatório gerado com sucesso: $OUTPUT_FILE"
echo ""
echo "📋 Estatísticas finais:"
wc -l "$OUTPUT_FILE" | awk '{print "  • Total de linhas no relatório:", $1}'
ls -lh "$OUTPUT_FILE" | awk '{print "  • Tamanho do relatório:", $5}'

# Opção para visualizar imediatamente
echo ""
read -p "👁️  Deseja visualizar o relatório agora? (s/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    less "$OUTPUT_FILE"
fi

# Opção para abrir no editor
echo ""
read -p "✏️  Deseja abrir no editor padrão? (s/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    if command -v code &> /dev/null; then
        code "$OUTPUT_FILE"
    elif command -v nano &> /dev/null; then
        nano "$OUTPUT_FILE"
    elif command -v vim &> /dev/null; then
        vim "$OUTPUT_FILE"
    else
        open "$OUTPUT_FILE"
    fi
fi