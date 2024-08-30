import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDTO } from '../dtos/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interface/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Inject Request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    repository: Repository<T>,
    paginationQuery: PaginationQueryDTO,
    options?: FindManyOptions<T>,
  ) {
    const { page, limit } = paginationQuery;
    const result = await repository.find({
      ...options,
      take: paginationQuery.limit,
      skip: (page - 1) * limit,
    });

    /**
     * Create request Url
     */
    const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
    const newURL = new URL(this.request.url, baseURL);
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;
    const itemsPerPage = limit;
    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? page : page - 1;

    const res: Paginated<T> = {
      data: result,
      meta: {
        totalItems,
        currentPage,
        itemsPerPage,
        totalPages,
      },
      links: {
        current: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${page}`,
        first: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${1}`,
        last: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${totalPages}`,
        next: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newURL.origin}${newURL.pathname}?limit=${limit}&page=${previousPage}`,
      },
    };

    return res;
  }
}
