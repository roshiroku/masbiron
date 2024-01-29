import qs from "qs";

export const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export const STRAPI_PATH = process.env.STRAPI_PATH;

export const STRAPI_PAGE_SIZE = 6;

/**
 * @typedef {{ field: string; asc?: boolean; desc?: boolean; }} SortOption
 * @typedef {"*" | string[] | object} Populate
 */

export class Strapi {
  static api(apiId) {
    return new Strapi(apiId);
  }

  /** @type {string} */
  #apiId;
  /** @type {(string | SortOption)[]} */
  #sort = [];
  #pagination = { page: 1, pageSize: STRAPI_PAGE_SIZE };
  #filters = {};
  /** @type {string[]} */
  #fields = [];
  /** @type {Populate | undefined} */
  #populate;

  get url() {
    return `${this.baseUrl}?${this.query}`;
  }

  get baseUrl() {
    return `${STRAPI_PATH}/api/${this.#apiId}`;
  }

  get query() {
    return qs.stringify(
      {
        populate: this.#populate,
        fields: this.#fields,
        filters: this.#filters,
        sort: this.#sort,
        pagination: this.#pagination,
      },
      { encodeValuesOnly: true }
    );
  }

  constructor(apiId) {
    this.#apiId = apiId;
  }

  /**
   * @param {Populate} [fields]
   */
  populate(fields = undefined) {
    this.#populate = fields;
    return this;
  }

  /**
   * @param  {...string} fields
   */
  fields(...fields) {
    this.#fields = fields;
    return this;
  }

  /**
   * @param {string} field
   */
  filter(field, value = undefined) {
    let filter = this.#filters[field];

    if (typeof value == "string" || typeof value == "number") {
      filter = { ...(filter ?? {}), $eq: value };
    } else if (Array.isArray(value)) {
      filter = [...(filter ?? []), ...value];
    } else if (typeof value == "object") {
      filter = { ...(filter ?? {}), ...value };
    }

    if (filter) {
      if (value === undefined) {
        delete this.#filters[field];
      } else {
        this.#filters[field] = filter;
      }
    }

    return this;
  }

  /**
   * @param  {...(string | SortOption)} by
   */
  sort(...by) {
    this.#sort = by.map((param) => this.#toSortParam(param));
    return this;
  }

  /**
   * @param {number} page
   */
  paginate(page, pageSize = STRAPI_PAGE_SIZE) {
    /** @todo propogate assertion */
    console.assert(page > 0);
    this.#pagination.page = page;
    this.#pagination.pageSize = pageSize;
    return this;
  }

  async execute() {
    const res = await fetch(this.url, { headers: { Authorization: `bearer ${STRAPI_TOKEN}` } });
    const json = await res.json();
    return json;
  }

  /**
   * @overload
   * @param {string} param
   * @returns {string}
   *
   * @overload
   * @param {SortOption} param
   * @returns {string}
   */
  #toSortParam(param) {
    return typeof param == "string" ? param : `${param.field}:${param.desc ? "desc" : "asc"}`;
  }
}
