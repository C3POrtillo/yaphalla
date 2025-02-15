# Yaphalla

# COMMIT RULES
[Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

Pull request titles should follow the same process but summarizing the branch's purpose.

Pull request descriptions should summarize commits or add additional context if the title is not enough.

I would install `Husky` to packages, but it does not work nicely with WSL - Run `yarn lint` and `yarn format` before merging.

## Components - `src/components/[component_name]/...`
Functional Components include their interface and export themselves under `[name].tsx`
* This includes `ReactProviders` or reusable components related to `[component_name]`
* All `tsx` code must be in `tsx` files
Constants and Types are export from `types.ts`

Functions related to a `[component_name]` that can be extracted from their `[name].tsx` are exported from `utils.ts`

## Links
`Next Link` component is implemented under `src/components/link/Link.tsx` and uses the `src/utils/parseUrl.ts` utility to
automatically parse and convert hrefs/paths/slugs/links automatically to internal/external.

Import the `Link` component from `@/components/link/Link.tsx` for MOST situations.

`Next Link` can be leveraged if needed, use the `parseUrl` util still.

## Styles `src/styles/...`
Just `globals.css`

## Utils `src/utils/...`
Functions that are not specific to components are found in a specific `[util_name].ts` file or `utils.ts` if its generic.

Website paths and external links are found in `paths.ts`, nested navigation is currently not supported (or needed).

## Component Previews
Slug/Path: `/preview/inputs` for input components and styling
