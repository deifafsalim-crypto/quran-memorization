export type Verse={n:number;text:string;meaning:string;lesson:string;details:string};
export type Vocab={word:string;meaning:string};
export type Stage={id:number,range:string,title:string,theme:string,verses:Verse[],vocab:Vocab[]};
export type Question={id:string,stage:number,type:string,prompt:string,options:string[],answer:string,explanation:string,hint:string,difficulty:'سهل'|'متوسط'|'متقدم'};
export type Progress={name:string,mode:string,completed:number[],scores:Record<number,number>,points:number,best:number,wrong:string[],lastStage:number,dark:boolean,motion:boolean,largeText:boolean,attempts:{date:string,score:number}[]};
