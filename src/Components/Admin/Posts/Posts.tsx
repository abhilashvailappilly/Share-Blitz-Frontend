import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  Tooltip,
  Switch,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
// import PostInfo from "./PostInfo";
// import ReportInfo from "./ReportInfo";

// //importing types
// import common from "../../../Constants/common"; // Assuming common.DEFAULT_IMG is a valid placeholder image
// import { PostDataInterface } from "../../../Types/post";
// import { ReportInfoInterface } from "../../../Types/admin";

const common ={DEFAULT_IMG:"dd"}
const TABLE_HEAD = [
  "Created By",
  "Post View",
  "Created At",
  "Updated At",
  "Report status",
  "Total Reports",
  "Status",
  "Block / Unblock",
];

interface PostListInterface {
  page: number;
  posts: any[];
}

const dummyPosts: any[] = [
  {
    _id: "1",
    user: {
      dp: common.DEFAULT_IMG,
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reports: [{ _id: "r1", reason: "Spam" }],
    isBlock: false,
  },
  {
    _id: "2",
    user: {
      dp: common?.DEFAULT_IMG || "k",
      name: "Jane Smith",
      username: "janesmith",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reports: [],
    isBlock: true,
  },
];

const dummyReportInfo: any[] = [
  { _id: "r1", reason: "Spam", createdAt: new Date().toISOString() },
];

const PostList = () => {
  const [postsList, setPostsList] = useState<any[]>(dummyPosts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reportInfo, setReportInfo] = useState<any[]>(dummyReportInfo);
  const [searchText, setSearchText] = useState<string>("");
  const [searchModeOn, setSearchModeOn] = useState<boolean>(false);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>, postId: string) => {
    const isChecked = e.target.checked;
    setPostsList((prev) => prev.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          isBlock: isChecked,
        };
      }
      return post;
    }));
    toast.dismiss();
    toast.success(isChecked ? "Post blocked successfully...!" : "Post unblocked successfully...!");
  };

  const handleGetReportInfo = (postId: string) => {
    setReportInfo(dummyReportInfo);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Card className=" w-full"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Posts list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                See information about all posts
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                                  label="Search"
                                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                  onChange={(e) => setSearchText(e.target.value)}
                                  value={searchText} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className=" px-0 overflow-y-scroll h-[35rem]"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {postsList.map((post, index) => {
                const isLast = index === postsList.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={post._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {post.user.dp ? (
                          <Avatar
                                        src={post.user.dp}
                                        alt={post.user.name}
                                        size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          />
                        ) : (
                          <Avatar
                                            src={'common?.DEFAULT_IMG'}
                                            alt={post.user.name}
                                            size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          />
                        )}
                        <div className="flex flex-col">
                          <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          >
                            {post.user.name}
                          </Typography>
                          <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal opacity-70"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          >
                            @{post.user.username}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Popover
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 50 },
                        }}
                      >
                        <PopoverHandler>
                          <Button
                                        size="sm"
                                        variant="outlined"
                                        className="rounded-full text-black border-black"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          >
                            View Post
                          </Button>
                        </PopoverHandler>
                        <PopoverContent className="z-[999] w-[32rem] overflow-hidden p-0"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <div className="p-10 bg-black bg-opacity-20">
                            {/* <PostInfo post={post} /> */}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className={classes}>
                      <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {moment(post.createdAt).format("L")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {post.createdAt !== post.updatedAt
                          ? moment(post.updatedAt).format("L")
                          : "N/A"}
                      </Typography>
                    </td>
                    <td
                      className={classes}
                      onClick={() => handleGetReportInfo(post._id)}
                    >
                      {post.reports && post.reports.length > 0 ? (
                        <Popover
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 50 },
                          }}
                        >
                          <PopoverHandler>
                            <Button
                                            size="sm"
                                            variant="outlined"
                                            className="rounded-full text-black border-black flex items-center gap-2"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                              View Reports
                            </Button>
                          </PopoverHandler>
                          <PopoverContent className="z-[999] w-[31rem] max-h-[35rem] overflow-hidden p-0"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className=" h-full p-10 bg-black bg-opacity-20">
                              {/* {reportInfo.length > 0 && (
                                // <ReportInfo report={reportInfo} />
                              )} */}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Button
                                        size="sm"
                                        variant="outlined"
                                        className="rounded-full text-black border-black"
                                        disabled    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                          View Reports
                        </Button>
                      )}
                    </td>
                    <td className={classes}>
                      {post.reports && post.reports.length > 0 ? (
                        <span
                          className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs 
                        font-bold leading-none text-white bg-red-600 rounded-full"
                        >
                          {post.reports.length}
                        </span>
                      ) : (
                        <h1 className="text-sm">N/A</h1>
                      )}
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={!post.isBlock ? "Active" : "Inactive"
                          }
                          color={!post.isBlock ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      {!post.isBlock ? (
                        <Tooltip content="Block post">
                          <Switch
                                        color="red"
                                        onChange={(e) => handleToggleChange(e, post._id)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                          />
                        </Tooltip>
                      ) : (
                        <Tooltip content="Unblock post">
                          <Switch
                                            checked
                                            color="red"
                                            onChange={(e) => handleToggleChange(e, post._id)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                          />
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Typography variant="small" color="blue-gray" className="font-normal"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
                          variant="outlined"
                          size="sm"
                          onClick={handlePrevious}
                          disabled={currentPage === 1}    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Previous
            </Button>
            <Button
                          variant="outlined"
                          size="sm"
                          onClick={handleNext}
                          disabled={currentPage === totalPages}    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostList;
