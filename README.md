

[![Build Status](https://travis-ci.org/postgres-plugin/insights.svg?branch=master)](https://travis-ci.org/postgres-plugin/insights)
[![codecov](https://codecov.io/gh/postgres-plugin/insights/branch/master/graph/badge.svg)](https://codecov.io/gh/postgres-plugin/insights)


# Insights



Pre-requisites:
- Create an insights and insights_test database:
  ```
  CREATE DATABASE insights;
  CREATE DATABASE insights_test
  ```

This plugin exposes the following functions on the request.server.methods.pg.insights object:

### _add(insightObj, cb)_
function to add a new insight, where `insightObj` takes the form:
```js
{
  title: 'Insight Title',
  url: 'www.ce100-insight-url.com',
  doctype: '.pdf',
  author: 'EMF',
  org_id: null,
  creator_id: 1,
  resource: true,
  active: true
}
```

On the successful save, the new insight's ID (generated by postgres) is returned.


### _browse(activeOnly, filterTag, cb)_
function to browse all active (and inactive) insights, with the option to filter by a certain tag
id. The parameters take the following values respectively:
- `activeOnly` = Boolean.
  - `true` to return active insights only.
  - `false` to return all active _and inactive_ insights.
- `filterTag`:
  - Integer if we want to filter by a tag id
  - `false` if we do not want to filter

If a tag id is given, returns:
```js
{ filter: { id: 69, name: 'Design for disassembly' },
  insights:
  [{
    id: 1,
    date: 2016-12-23T11:27:41.760Z,
    title: 'Insight Number 1',
    url: 'https://....',
    tags: [
    {
      tag_id: 8,
      tag_name: 'Agriculture'
    }, {
      tag_id: 22,
      tag_name: 'Telecommunications'
    }, {
  ...
  }]
}
```

If `false` is given, returns the same shape, but with

```
filter_tag: undefined
```
