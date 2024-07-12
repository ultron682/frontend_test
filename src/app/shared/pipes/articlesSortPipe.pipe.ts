import { Pipe, PipeTransform } from "@angular/core";
import { Row } from "../models/Row";
import { orderBy } from 'lodash';

@Pipe({
  name: "rowSortPipe",
})
export class RowSortPipe implements PipeTransform {
  transform(array: any): any[] {

    return orderBy(array, "content", 'asc');
}
}
