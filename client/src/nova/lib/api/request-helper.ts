// import { GetResourceParams } from "./get-entity-options";

// class RequestHelper {
//   // Cannot use axios params directly because it misinterprets complex structures
//   // like sorts and filters. This method formats the query params correctly.
//   makeRequestParams(request?: GetResourceParams): URLSearchParams {
//     const params = new URLSearchParams();
//     if (!request) {
//       return params;
//     }

//     if (request?.locale) {
//       params.append("locale", request.locale);
//     }

//     const pag = request?.pagination;
//     if (pag) {
//       if (pag.page) {
//         params.append("page", `${pag.page}`);
//       }

//       if (pag["per-page"]) {
//         params.append("per-page", `${pag["per-page"]}`);
//       }
//     }

//     if (request?.sortDirection && request?.sortField) {
//       params.append("sorts[0][field]", `${request.sortField}`);
//       params.append("sorts[0][direction]", `${request.sortDirection}`);
//     }

//     if (request?.filters) {
//       Object.entries(request.filters).forEach(([field, filter], index) => {
//         if (!field || !filter || filter.values.length < 1) {
//           return;
//         }

//         params.append(`filters[${index}][field]`, field);
//         params.append(`filters[${index}][op]`, filter.op || "");
//         filter.values.forEach((value) => {
//           params.append(`filters[${index}][values][]`, value);
//         });
//       });
//     }

//     if (request?.search) {
//       params.append("search", request.search);
//     }

//     return params;
//   }

//   makeRequestBody(request?: GetResourceParams) {
//     if (!request) {
//       return {};
//     }

//     let filters = [];
//     if (request.filters) {
//       filters = Object.entries(request.filters).map(([field, filter]) => ({
//         field,
//         op: filter.op,
//         values: filter.values,
//       }));
//     }
//   }
// }

// export const requestHelper = new RequestHelper();
