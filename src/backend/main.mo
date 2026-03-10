import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Order "mo:core/Order";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type Category = {
    #jcbOperator;
    #mason;
    #electrician;
    #plumber;
    #painter;
    #labour;
    #driver;
    #carpenter;
  };

  public type WorkerProfile = {
    id : Principal;
    name : Text;
    phone : Text;
    category : Category;
    location : Text;
    experienceYears : Nat;
    description : Text;
  };

  public type JobPosting = {
    id : Principal;
    title : Text;
    category : Category;
    location : Text;
    description : Text;
    contactPhone : Text;
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
  };

  module WorkerProfile {
    public func compare(a : WorkerProfile, b : WorkerProfile) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module JobPosting {
    public func compare(a : JobPosting, b : JobPosting) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  let workerProfiles = Map.empty<Principal, WorkerProfile>();
  let jobPostings = Map.empty<Principal, JobPosting>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Required user profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Worker profile functions
  public shared ({ caller }) func registerWorkerProfile(name : Text, phone : Text, category : Category, location : Text, experienceYears : Nat, description : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can register worker profiles");
    };
    let profile : WorkerProfile = {
      id = caller;
      name;
      phone;
      category;
      location;
      experienceYears;
      description;
    };
    workerProfiles.add(caller, profile);
  };

  public shared ({ caller }) func postJob(title : Text, category : Category, location : Text, description : Text, contactPhone : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can post jobs");
    };
    let job : JobPosting = {
      id = caller;
      title;
      category;
      location;
      description;
      contactPhone;
    };
    jobPostings.add(caller, job);
  };

  // Public query functions - accessible to all including guests
  public query ({ caller }) func getWorkersByCategory(category : Category) : async [WorkerProfile] {
    workerProfiles.values().toArray().filter(
      func(profile) {
        profile.category == category;
      }
    );
  };

  public query ({ caller }) func getAllJobPostings() : async [JobPosting] {
    jobPostings.values().toArray().sort();
  };

  public query ({ caller }) func getJobsByCategory(category : Category) : async [JobPosting] {
    jobPostings.values().toArray().filter(
      func(post) {
        post.category == category;
      }
    );
  };

  public query ({ caller }) func getWorkerProfile(worker : Principal) : async ?WorkerProfile {
    workerProfiles.get(worker);
  };

  public query ({ caller }) func getJobPosting(user : Principal) : async ?JobPosting {
    jobPostings.get(user);
  };
};
