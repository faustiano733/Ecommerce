export const capitalize = (name) => {
    if (!name) return '';
    
    // Lista de palavras para manter em minúsculas
    const lowercaseWords = ['de', 'da', 'do', 'das', 'dos', 'e'];
    
    return name
      .toLowerCase()
      .split(' ')
      .map((word, index) => 
        lowercaseWords.includes(word) && index !== 0 
          ? word 
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  };

export const createSlug = (str)=>{
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/\s+/g,'-')
    .replace(/[^\w\-]+/g,'')
    .replace(/\-\-+/g,'-')
    .replace(/^-+/,'')
    .replace('/-+$/','')
}