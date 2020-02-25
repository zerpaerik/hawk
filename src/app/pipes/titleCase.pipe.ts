import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name:'titleCase'
})

export class TitleCasePipe implements PipeTransform{

    public transform(input:string): string{
        if (!input) {
            return '';
        } else {
            return input[0].replace(/\b\w/g, first => first[0].toLocaleUpperCase()) 
        }
    }
}

@Pipe({
    name:'titleSentence'
})

export class TitleWordPipe implements PipeTransform{

    public transform(input:string): string{
        if (!input) {
            return '';
        } else {
            let title = input.substring(1, input.length);
            title = input[0] + title.toLowerCase();
            return title 
        }
    }
}