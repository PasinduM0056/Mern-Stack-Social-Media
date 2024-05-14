import React from "react";
import CreatePost from "../../components/CreatePost";
import "./createaPost.css";
import { Box, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
function CreateAposts() {
  return (
    <div>
      <div
        className="Create-a-post-up-container"
        style={{
          minWidth: "230vh",
          height: "40vh",
          marginLeft: "-40vh",
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <div class="Create-a-post-tooltip-container">
          <span class="Create-a-post-tooltip-1">
            Provide accurate information.
          </span>
          <span class="Create-a-post-tooltip-2">Make a Rich Text Editing.</span>
          <span class="Create-a-post-tooltip-3">
            Participate in challenges.
          </span>
          <span>Create a dedicated post about you company</span>
        </div>

        <h1
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",

            marginTop: "5vh",
            fontWeight: "700",
          }}
        >
          When crafting a job post, employees should aim for clarity and appeal,
          capturing both skills needed and company culture's feel. Accuracy and
          inclusivity pave the path,
          <br /> ensuring the right candidates find their way to our staff.
        </h1>
      </div>

      <Heading as="h1" size="lg" style={{marginTop:'10vh'}}>
        When you are posting some post regarding your company, you should pay
        attention on below points
      </Heading>
      <List mt={2} spacing={2}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Be concise and clear about job responsibilities and qualifications.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Highlight unique benefits and perks offered by your company.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Use inclusive language to attract a diverse pool of candidates.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Include information about career growth opportunities within the
          company.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Provide clear instructions on how to apply for the job.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Ensure the job post is compliant with relevant employment laws and
          regulations.
        </ListItem>
      </List>
      <CreatePost />
    </div>
  );
}

export default CreateAposts;
