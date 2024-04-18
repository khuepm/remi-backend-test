
// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

// describe('Testing Auth', () => {
//   describe('[POST] /signup', () => {
//     it('response should have the Create userData', async () => {
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4!',
//       };

//       const authRoute = new AuthRoute();
//       const users = authRoute.authController.authService.users;

//       users.findOne = jest.fn().mockReturnValue(null);
//       users.create = jest.fn().mockReturnValue({
//         _id: '60706478aad6c9ad19a31c84',
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10),
//       });

//       (mongoose as any).connect = jest.fn();
//       const app = new App([authRoute]);
//       return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
//     });
//   });

//   describe('[POST] /login', () => {
//     it('response should have the Set-Cookie header with the Authorization token', async () => {
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4!',
//       };

//       const authRoute = new AuthRoute();
//       const users = authRoute.authController.authService.users;

//       users.findOne = jest.fn().mockReturnValue({
//         _id: '60706478aad6c9ad19a31c84',
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10),
//       });

//       (mongoose as any).connect = jest.fn();
//       const app = new App([authRoute]);
//       return request(app.getServer())
//         .post(`${authRoute.path}login`)
//         .send(userData)
//         .expect('Set-Cookie', /^Authorization=.+/);
//     });
//   });

// });


// describe('fetchDataFromAPI function', () => {
//   // Test case for successful API response
//   it('should fetch data from API successfully', async () => {
//     // Mocking the API response
//     const mockApiResponse = { data: [], message: 'success' };
//     // jest.spyOn(global, 'fetch').mockResolvedValue({
//     //   json: jest.fn().mockResolvedValue(mockApiResponse),
//     //   status: 200
//     // });

//     const youtubeRoute = new YoutubeRoute();
//     const YoutubeController = youtubeRoute.controller

//     // Call the function and await its response
//     // const result = await YoutubeController.getVideos();
//       const app = new App([youtubeRoute]);
//       const ret =  request(app.getServer())
//         .post(`${youtubeRoute.path}`)
//         .send({
//           id: 'dQw4w9WgXcQ'
//         })
//         console.log(ret)

//     // // Assertions
//     // expect(result).toEqual(mockApiResponse.data);
//     // expect(global.fetch).toHaveBeenCalledWith('API_ENDPOINT');
//   });

//   // Test case for API response with error message
//   it('should handle API response with error message', async () => {
//   });

//   // Test case for API response with non-200 status code
//   it('should handle API response with non-200 status code', async () => {
//   });
// });
