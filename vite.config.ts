import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';
export default defineConfig({
  base:'./',
  preview:{allowedHosts:['.loca.lt','.trycloudflare.com']},
  plugins:[react(),{
    name:'include-tur-word-document',
    generateBundle(){
      this.emitFile({type:'asset',fileName:'شرح سورة الطور من 20 إلى 40.docx',source:readFileSync(resolve(import.meta.dirname,'شرح سورة الطور من 20 إلى 40.docx'))});
      this.emitFile({type:'asset',fileName:'شرح سورة الذاريات من 31 إلى 60.docx',source:readFileSync(resolve(import.meta.dirname,'شرح سورة الذاريات من 31 إلى 60.docx'))});
    }
  }],
  build:{rollupOptions:{input:{main:resolve(import.meta.dirname,'index.html'),tur:resolve(import.meta.dirname,'tur.html'),dhariyat:resolve(import.meta.dirname,'dhariyat.html')}}}
});
