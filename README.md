# Custom range component

This Range component is an interactive slider that allows users to select a range of values.

It supports two types of ranges:

- Continuous Range: Uses min and max values
- Fixed Range: Uses a predefined array of values

The Range component accepts the following props for customization:

- min (minimum value)
- max (maximum value)
- values (fixed range values)
- width (slider width)
- step (value increment/decrement)
- onChange (callback function when the range changes)

## Prerequisite

- NextJS
- TypeScript
- Testing

## 1. Install and run

1. Run `npm install` to install all the package
2. Run `npm run dev` to start the application
3. The application will be available at [http://localhost:8080](http://localhost:8080)
4. Navigate to normal range component: [http://localhost:8080/exercise1](http://localhost:8080/exercise1)
5. Navigate to fixed range component: [http://localhost:8080/exercise2](http://localhost:8080/exercise2)

## Tests

Execute the following command to run the unit tests:

```
npm run test
```
